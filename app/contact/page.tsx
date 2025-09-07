"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert(`Thanks, ${formData.name}! We will get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 w-full"
          >
            Send Message
          </button>
        </form>

        {/* Address + Map */}
        <div className="bg-[#1e1b4b] p-6 rounded-2xl shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-3">Our Address</h2>
          <p className="mb-4">
            Jyotishasha<br />
            Gomti Nagar,<br />
            Lucknow, India<br />
            Pin: 226010
          </p>
          <p className="text-purple-200 mb-6">
            Email:{" "}
            <a href="mailto:support@jyotishasha.com" className="underline">
              support@jyotishasha.com
            </a>
          </p>
          {/* Google Map */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Jyotishasha Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.358476404228!2d80.98453007540786!3d26.848610676673586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc0a6d512f1%3A0x8b14fbc056d4dfc!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1699999999999"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
