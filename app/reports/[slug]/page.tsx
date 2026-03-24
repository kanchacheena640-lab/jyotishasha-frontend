"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { reportsData, Report } from "../../data/reportsData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";


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
  const placeRef = useRef<HTMLInputElement | null>(null);
  const params = useParams();
  const productId = params?.slug as string;
  const currentReport = reportsData.find((r: Report) => r.slug === productId);
  const price = currentReport?.price || 0;

  // 🌍 Google Places Autocomplete logic
  useEffect(() => {
    if (!placeRef.current) return;
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
          // Payment Success hone ke baad ka logic
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          console.log("Save this to DB:", { ...form, paymentId: response.razorpay_payment_id });
          
          // Redirect to success page:
          // window.location.href = "/payment-success";
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#7e22ce", // Purple theme
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        alert("Payment Failed. Reason: " + response.error.description);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during payment initialization.");
    } finally {
      setIsProcessing(false);
    }
  };

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