import Image from "next/image";
import { fetchAllDailyHoroscopes } from "@/lib/astroblog";

interface Props {
  params: { sign: string };
}

export default async function HoroscopeDetail({ params }: Props) {
  const { sign } = params;
  const lang: "en" | "hi" = "en"; // later connect to context

  const data = await fetchAllDailyHoroscopes(lang);
  const current = data.find((item) => item.sign === sign.toLowerCase());

  if (!current?.post) {
    return (
      <div className="max-w-3xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-semibold mb-2">Horoscope Not Found</h1>
        <p>No horoscope available for {sign}.</p>
      </div>
    );
  }

  const title = current.post.title?.rendered || `${sign} Horoscope`;
  const content = current.post.content?.rendered || "";
  const image =
    current.post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    current.post.better_featured_image?.source_url ||
    null;

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-md">
      {/* 🔮 Featured Image */}
      {image && (
        <div className="mb-6">
          <Image
            src={image}
            alt={sign}
            width={800}
            height={400}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      )}

      {/* 🪐 Heading */}
      <h1
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {/* ✍️ Horoscope Content */}
      <div
        className="text-lg text-gray-800 leading-relaxed space-y-4 prose prose-p:my-3 prose-headings:mb-3"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
