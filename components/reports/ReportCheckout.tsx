"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { reportsData, Report } from "@/app/data/reportsData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { loadGoogleMapsPlaces } from "@/components/PlaceAutocompleteInput";


// Ye check karega ki agar i18n start nahi hua hai, toh usko forced start kar dega
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en', // Default English
    resources: {
      en: { translation: {} },
      hi: { translation: {} }
    }
  });
}


// 🚀 Helper Function: Razorpay Script Load karne ke liye
const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Payment succeeding with Razorpay and the report actually being handed off
// to the backend (via /webhook) are two separate events. This tracks the
// case where Razorpay confirms the charge but /webhook could not be
// confirmed successful -- kept minimal (just the two IDs a support agent
// needs) rather than the full backend response shape.
interface FulfillmentIssue {
  orderId: string;
  paymentId: string;
}

export default function ReportCheckout() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    tob: "",
    pob: "",
    latitude: "",
    longitude: "",
    language: currentLang,
  });

  const [isProcessing, setIsProcessing] = useState(false); // 🚨 Button state ke liye
  // See FulfillmentIssue above. Non-null replaces the form entirely (below)
  // so a real charge can never be immediately followed by a second Pay
  // click -- it must never be presented as a failed payment.
  const [fulfillmentIssue, setFulfillmentIssue] = useState<FulfillmentIssue | null>(null);
  // Once Razorpay's handler confirms a real payment, isProcessing must never
  // be reset back to false by anything else again -- not modal.ondismiss
  // (which Razorpay also fires after a *successful* payment closes the
  // modal, not just on cancel) and not any other code path. A ref, not
  // state, because it must be readable synchronously the instant the
  // handler starts, before any await -- avoiding a race between modal
  // dismissal, payment success, and webhook confirmation.
  const paymentConfirmedRef = useRef(false);
  const placeRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const productId = params?.slug as string;
  const currentReport = reportsData.find((r: Report) => r.slug === productId);
  const price = currentReport?.price || 0;

  // 🌍 Google Places Autocomplete logic
  useEffect(() => {
    if (!placeRef.current) return;
    // Google Maps used to load globally on every page via app/layout.tsx.
    // It's now loaded on demand instead -- this triggers that same shared,
    // idempotent load (safe to call even if another component on the page
    // already triggered it). The polling loop below is unchanged: it just
    // waits for window.google.maps to become available, however it got there.
    loadGoogleMapsPlaces();
    const interval = setInterval(() => {
      if ((window as any).google?.maps) {
        clearInterval(interval);
        const autocomplete = new (window as any).google.maps.places.Autocomplete(placeRef.current!, {
          types: ["(cities)"],
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setForm((prev) => ({
            ...prev,
            pob: place.name || "",
            latitude: place.geometry?.location?.lat()?.toString() || "",
            longitude: place.geometry?.location?.lng()?.toString() || "",
          }));
        });
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  // 💰 The Real Razorpay Logic connected to Flask Backend
  const handleSubmit = async () => {
    if (!form.email || !form.dob || !form.tob || !form.pob || !form.name || !form.phone) {
      alert(currentLang === 'hi' ? "❗ कृपया सभी अनिवार्य जानकारी भरें" : "❗ Please fill all required fields");
      return;
    }

    paymentConfirmedRef.current = false;
    setIsProcessing(true); // Button ko disable/loading state me daalo

    try {
      // Step 1: Load Razorpay SDK
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert(currentLang === 'hi' ? "पेमेंट गेटवे लोड नहीं हो सका। कृपया इंटरनेट जांचें।" : "Failed to load Razorpay SDK. Check your internet.");
        setIsProcessing(false);
        return;
      }

      // Step 2: Create Order via Flask Backend (Port 5000)
      const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const orderResponse = await fetch(`${base}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🚨 Sirf 'product' bhej rahe hain (amount Flask khud handle karega)
        body: JSON.stringify({ product: productId }),
      });

      const orderData = await orderResponse.json();

      // 🚨 Flask 'order_id' bhej raha hai, 'id' nahi
      if (!orderData.order_id) {
        alert(`Server error: ${orderData.error || "Order ID not generated!"}`);
        setIsProcessing(false);
        return;
      }

      // Step 3: Open Razorpay Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // 🚨 Test key aapki .env me honi chahiye
        amount: orderData.amount * 100, // Razorpay ko paise (paise) mein chahiye hota hai
        currency: orderData.currency,
        name: "Jyotishasha",
        description: `${currentReport?.title?.en || "Astrology"} Report`,
        order_id: orderData.order_id, // 🚨 Updated parameter
        handler: async function (response: any) {
          // Razorpay has confirmed the charge. Lock the CTA for good --
          // synchronously, before any await -- so nothing (modal.ondismiss
          // firing right after this as the modal closes, a stray re-render)
          // can race it back open while /webhook is still pending below.
          paymentConfirmedRef.current = true;
          setIsProcessing(true);

          // That confirmation is NOT the same thing as the report being
          // generated -- this call hands the payment off to the backend
          // (POST /webhook), which independently verifies the Razorpay
          // signature before dispatching report generation (see
          // OrderService.create_paid_report_order()). If this call fails,
          // the money has already been taken: the user must never be told
          // the payment failed or be invited to pay again.
          try {
            const webhookRes = await fetch(`${base}/webhook`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                product: productId,
                name: form.name,
                email: form.email,
                phone: form.phone,
                dob: form.dob,
                tob: form.tob,
                pob: form.pob,
                latitude: form.latitude,
                longitude: form.longitude,
                language: form.language,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!webhookRes.ok) {
              setFulfillmentIssue({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              });
              return;
            }

            // Same destination the dedicated Relationship Future Report
            // flow already redirects to on success -- not a new page.
            window.location.href = `/${currentLang}/thank-you`;
          } catch {
            // Network failure reaching /webhook itself is the same
            // "payment succeeded, fulfillment unconfirmed" case as a 4xx/5xx.
            setFulfillmentIssue({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
            });
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#7e22ce", // Purple theme
        },
        modal: {
          // Fires when the checkout closes for any reason -- including
          // right after a *successful* payment, not only on cancel. Only
          // recover the CTA here if a real payment was never confirmed;
          // otherwise this would race the lock the handler above just set.
          ondismiss: function () {
            if (!paymentConfirmedRef.current) {
              setIsProcessing(false);
            }
          },
        },
      };

      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.on('payment.failed', function (response: any) {
        alert("Payment Failed. Reason: " + response.error.description);
      });

      paymentObject.open();
      // No finally-based reset here: once .open() succeeds without
      // throwing, isProcessing must stay true until either modal.ondismiss
      // recovers it (payment never confirmed) or the handler above takes
      // over for good (payment confirmed) -- resetting it unconditionally
      // here is exactly the race this fix closes.

    } catch (error) {
      alert("Something went wrong during payment initialization.");
      setIsProcessing(false);
    }
  };

  if (fulfillmentIssue) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 font-sans text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-200">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-xl font-bold text-amber-700 mb-3">
            {currentLang === 'hi' ? 'भुगतान प्राप्त हो गया' : 'Payment Received'}
          </h2>
          <p className="text-gray-700 mb-4">
            {currentLang === 'hi'
              ? 'आपका भुगतान सफलतापूर्वक प्राप्त हो गया है, लेकिन हम आपकी रिपोर्ट प्रोसेसिंग की पुष्टि नहीं कर सके। कृपया नीचे दिए गए विवरण के साथ हमारी सहायता टीम से संपर्क करें। कृपया दोबारा भुगतान न करें।'
              : "Your payment was received successfully, but we couldn't confirm that your report is being processed. Please contact our support team with the details below. Please do not pay again."}
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 space-y-1">
            <div><strong>{currentLang === 'hi' ? 'ऑर्डर आईडी' : 'Order ID'}:</strong> {fulfillmentIssue.orderId}</div>
            <div><strong>{currentLang === 'hi' ? 'भुगतान आईडी' : 'Payment ID'}:</strong> {fulfillmentIssue.paymentId}</div>
          </div>
          <a
            href="https://wa.me/917007012255"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            💬 {currentLang === 'hi' ? 'सहायता के लिए व्हाट्सएप पर चैट करें' : 'Chat with support on WhatsApp'}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 font-sans">
      <h2 className="text-2xl font-bold mb-8 text-center text-purple-800">
        {currentLang === 'hi'
          ? `${currentReport?.title?.hi || "रिपोर्ट"} के लिए विवरण भरें`
          : `Fill Details for ${currentReport?.title?.en || "Report"}`}
      </h2>

      {/* 👤 Personal Details Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 mb-6">
        <h3 className="text-lg font-bold mb-4 text-purple-700 border-b pb-2">
          👤 {currentLang === 'hi' ? "व्यक्तिगत विवरण" : "Personal Details"}
        </h3>
        <div className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder={currentLang === 'hi' ? "पूरा नाम *" : "Full Name *"} className="inputStyle" required />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="inputStyle" required />
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={currentLang === 'hi' ? "फ़ोन नंबर *" : "Phone Number *"} className="inputStyle" required />
        </div>
      </div>

      {/* 🔮 Birth Details Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 mb-8">
        <h3 className="text-lg font-bold mb-4 text-purple-700 border-b pb-2">
          🔮 {currentLang === 'hi' ? "जन्म विवरण" : "Birth Details"}
        </h3>
        <div className="space-y-4">

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === 'hi' ? "जन्म तिथि *" : "Date of Birth *"}
            </label>
            <DatePicker
              selected={form.dob ? new Date(`${form.dob}T00:00:00`) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  const formatted = date.toISOString().split('T')[0];
                  setForm(prev => ({ ...prev, dob: formatted }));
                }
              }}
              dateFormat="dd-MM-yyyy"
              className="inputStyle text-gray-900 w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholderText="DD-MM-YYYY"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === 'hi' ? "जन्म का समय *" : "Time of Birth *"}
            </label>
            <input type="time" name="tob" value={form.tob} onChange={handleChange} className="inputStyle" required />
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === 'hi' ? "जन्म स्थान *" : "Place of Birth *"}
            </label>
            <input ref={placeRef} name="pob" value={form.pob} onChange={handleChange} placeholder={currentLang === 'hi' ? "शहर चुनें" : "Search City"} className="inputStyle text-gray-900" required />
          </div>

          {/* Report Language Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              {currentLang === 'hi' ? "रिपोर्ट की भाषा" : "Report Language"}
            </label>
            <select name="language" value={form.language} onChange={handleChange} className="inputStyle">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all active:scale-95 ${
          isProcessing ? "bg-purple-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
        }`}
      >
        {isProcessing
          ? (currentLang === 'hi' ? "प्रोसेस हो रहा है..." : "Processing...")
          : (currentLang === 'hi' ? `भुगतान करें ₹${price}` : `Proceed to Pay ₹${price}`)}
      </button>

      <style jsx>{`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
          background: #fff;
          color: #1a202c;
        }
        .inputStyle:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px #ddd6fe;
        }
      `}</style>
    </div>
  );
}
