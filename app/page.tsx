'use client';
import TestimonialSection from "../components/TestimonialSection";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import '../i18n'; // import i18n config
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useEffect } from "react";
import { apiGet } from "@/lib/api";


export default function Home() {
  const { t } = useTranslation();
  const zodiacSigns = [
    { name: "Aries", img: "/zodiac/aries.png" },
    { name: "Taurus", img: "/zodiac/taurus.png" },
    { name: "Gemini", img: "/zodiac/gemini.png" },
    { name: "Cancer", img: "/zodiac/cancer.png" },
    { name: "Leo", img: "/zodiac/leo.png" },
    { name: "Virgo", img: "/zodiac/virgo.png" },
    { name: "Libra", img: "/zodiac/libra.png" },
    { name: "Scorpio", img: "/zodiac/scorpio.png" },
    { name: "Sagittarius", img: "/zodiac/sagittarius.png" },
    { name: "Capricorn", img: "/zodiac/capricorn.png" },
    { name: "Aquarius", img: "/zodiac/aquarius.png" },
    { name: "Pisces", img: "/zodiac/pisces.png" },
  ];

  const tools = [
    { name: "Rashi Finder", emoji: "🔱", link: "/tools/rashi-finder" },
    { name: "Lagna Finder", emoji: "📜", link: "/tools/lagna-finder" },
    { name: "Planet Overview", emoji: "🪐", link: "/tools/planet-overview" },
    { name: "Grah Dasha", emoji: "🌀", link: "/tools/grah-dasha-finder" },
    { name: "Mangal Dosh", emoji: "🌠", link: "/tools/mangal-dosh" },
    { name: "Chandra Mangal", emoji: "👍👎", link: "/tools/chandra-mangal" },
    { name: "Your Love Life", emoji: "❤️", link: "/tools/love-life" },
    { name: "Your Career", emoji: "📖", link: "/tools/career-path" },
    { name: "Foreign Travel", emoji: "✈️", link: "/tools/foreign-travel" },
    { name: "Sadhesati Report", emoji: "🪐", link: "/reports/sadhesati-calculator" },
    { name: "Business Report", emoji: "💼", link: "/reports/business-path" },
    { name: "Sarkaari Naukari", emoji: "👍", link: "/reports/government-job" }
  ];

  useEffect(() => {
    apiGet("/api/health")
      .then((res) => console.log("✅ Backend OK:", res))
      .catch((err) => console.error("❌ Backend Error:", err));
  }, []);


  return (
    <div className="text-center pt-24 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen">
      {/* Zodiac Signs Grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {t('home.cosmic_path')}
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {zodiacSigns.map((sign, idx) => (
            <Link
              key={idx}
              href={`/horoscope/${sign.name.toLowerCase()}`}
              className="flex flex-col items-center bg-[#1e1b4b] p-4 rounded-lg hover:bg-purple-600 transition"
            >
              <img src={sign.img} alt={sign.name} className="w-20 h-20 mb-2" />
              <p className="text-white text-sm">{t(`zodiac.${sign.name.toLowerCase()}`)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials + Subscribe CTA */}
      <TestimonialSection />

      {/* Free Astrology Tools Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          {t('home.explore_tools')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tools.map((tool, index) => {
          return (
            <Link
              key={index}
              href={tool.link}
              className="bg-[#f1f0ff] text-center rounded-xl p-4 border border-white shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 flex flex-col items-center justify-center h-28"
            >
              <div className="text-3xl mb-2">{tool.emoji}</div>
              <span className="block text-sm sm:text-base font-semibold text-gray-800">
                {t(`tools.${tool.name.replace(/\s+/g, '_').toLowerCase()}`)}
              </span>
            </Link>
          );
        })}
      </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="/tools"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            {t('home.more_about_you')}
          </a>
        </div>
      </section>

      {/* Personalized Reports Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          {t('home.personalized_reports')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Sadhesati Report */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200">
            <img src="/reports/sadhesati-report.webp" alt="Sadhesati Report" className="w-full h-44 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">{t('reports.sadhesati.title')}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {t('reports.sadhesati.desc')}
              </p>
              <p className="text-blue-700 font-semibold mb-3">Price: ₹98</p>
              <Link href="/reports/sadhesati_report" passHref>
              <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              </Link>
            </div>
          </div>

          {/* Financial Report */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200">
            <img src="/reports/financial-report.webp" alt="Financial Report" className="w-full h-44 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Financial Report</h3>
              <p className="text-gray-600 text-sm mb-3">
                Financial insights & wealth prediction for your future.
              </p>
              <p className="text-blue-700 font-semibold mb-3">Price: ₹98</p>
              <Link href="/reports/financial_report" passHref>
              <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              </Link>
            </div>
          </div>

          {/* Love Life Report */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200">
            <img src="/reports/love-life-report.webp" alt="Love Life Report" className="w-full h-44 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Love Life Report</h3>
              <p className="text-gray-600 text-sm mb-3">
                Analyze your love life, compatibility and challenges.
              </p>
              <p className="text-blue-700 font-semibold mb-3">Price: ₹98</p>
              <Link href="/reports/love_relationship_report" passHref>
              <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              </Link>
            </div>
          </div>

          {/* Marriage Report */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-300 overflow-hidden border border-gray-200">
            <img src="/reports/marriage-report.webp" alt="Marriage Report" className="w-full h-44 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Marriage Report</h3>
              <p className="text-gray-600 text-sm mb-3">
                Get predictions about your married life & partner.
              </p>
              <p className="text-blue-700 font-semibold mb-3">Price: ₹98</p>
              <Link href="/reports/marriage_report" passHref>
              <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
        </div>

        {/* View All Reports CTA */}
        <div className="text-center mt-8">
          <a
            href="/reports"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            {t('home.view_all_reports')}
          </a>
        </div>
      </section>

      {/* Subscribe & Social Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.stay_connected')}
          </h2>
          <p className="text-purple-200 mb-6">
            {t('home.newsletter_text')}
          </p>

          {/* Subscribe Form */}
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full sm:w-80 rounded-lg focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-200 transition"
            >
              {t('home.subscribe_btn')}
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <a href="#" className="text-white text-2xl hover:text-purple-300 transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white text-2xl hover:text-purple-300 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white text-2xl hover:text-purple-300 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white text-2xl hover:text-purple-300 transition">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
