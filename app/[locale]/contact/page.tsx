import ContactForm from "./ContactForm";

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const isHi = params.locale === "hi";

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        {isHi ? "संपर्क करें" : "Contact Us"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ✅ Client Form */}
        <ContactForm locale={params.locale} />

        {/* ✅ Address Section */}
        <div className="bg-[#1e1b4b] p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-3">
            {isHi ? "हमारा पता" : "Our Address"}
          </h2>

          <p className="mb-4">
            Jyotishasha<br />
            Gomti Nagar,<br />
            Lucknow, India<br />
            Pin: 226010
          </p>

          <p className="text-purple-200 mb-6">
            {isHi ? "ईमेल:" : "Email:"}{" "}
            <a href="mailto:support@jyotishasha.com" className="underline">
              support@jyotishasha.com
            </a>
          </p>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Jyotishasha Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.358476404228!2d80.98453007540786!3d26.848610676673586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc0a6d512f1%3A0x8b14fbc056d4dfc!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1699999999999"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}