"use client";
import { useState } from "react";

export default function ContactForm({ locale }: { locale: string }) {
  const isHi = locale === "hi";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
      setError(
        isHi
          ? "कृपया सही ईमेल दर्ज करें"
          : "Please enter a valid email address."
      );
      return;
    }

    setError("");

    alert(
      isHi
        ? `धन्यवाद, ${formData.name}! हम जल्द संपर्क करेंगे।`
        : `Thanks, ${formData.name}! We will get back to you soon.`
    );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
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
          placeholder={isHi ? "आपका नाम" : "Your Name"}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={isHi ? "आपका ईमेल" : "Your Email"}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-6">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={isHi ? "आपका संदेश" : "Your Message"}
          rows={4}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg w-full"
      >
        {isHi ? "संदेश भेजें" : "Send Message"}
      </button>
    </form>
  );
}