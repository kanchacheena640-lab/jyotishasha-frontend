export default function HoroscopeComparison() {
  return (
    <div className="mt-12 bg-gradient-to-r from-purple-900 to-purple-700 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">✨ General vs Personalized Horoscope ✨</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* General Horoscope */}
        <div className="bg-[#2d2a6b] p-4 rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">🔮 General (Free)</h3>
            <ul className="list-disc list-inside text-purple-200 text-sm space-y-1 mb-4">
              <li>Generic predictions only.</li>
              <li>❌ No alerts or remedies.</li>
              <li>Just for casual reading.</li>
            </ul>
          </div>
          <button className="mt-auto px-4 py-2 bg-white text-purple-800 font-bold rounded-lg hover:bg-gray-200 transition self-center">
            Read Free
          </button>
        </div>

        {/* Personalized Horoscope */}
        <div className="bg-[#3b376b] p-4 rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-center">🌟 Personalized (Premium)</h3>
            <ul className="list-disc list-inside text-purple-200 text-sm space-y-1 mb-4">
              <li><span className="text-yellow-300 font-bold">Daily guidance</span> based on your Kundali.</li>
              <li>💰 Financial, ❤️ Love, 😌 Mood & 🧘 Lifestyle alerts.</li>
              <li>⭐ Exclusive insights every day.</li>
            </ul>
            <div className="text-center text-sm space-y-1 mb-4">
              <p>📅 <span className="font-bold">Monthly:</span> ₹51</p>
              <p>📆 <span className="font-bold">Yearly:</span> ₹551</p>
            </div>
          </div>
          <button className="mt-auto px-4 py-2 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition self-center">
            🚀 Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
