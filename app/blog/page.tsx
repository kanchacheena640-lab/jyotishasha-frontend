"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*`
        );
        const data = await res.json();
        setBlogs(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <Head>
        {/* 🔑 Basic SEO */}
        <title>Our Blog | Jyotishasha</title>
        <meta
          name="description"
          content="Read the latest blogs on astrology, numerology, and spiritual guidance from Jyotishasha."
        />
        <meta name="keywords" content="Astrology, Numerology, Horoscope, Remedies, Jyotishasha Blog" />

        {/* 🔑 Open Graph (Facebook / LinkedIn) */}
        <meta property="og:title" content="Our Blog | Jyotishasha" />
        <meta
          property="og:description"
          content="Explore the latest astrology and numerology blogs from Jyotishasha."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotishasha.com/blog" />
        <meta
          property="og:image"
          content="https://jyotishasha.com/default-og.jpg"
        />

        {/* 🔑 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Blog | Jyotishasha" />
        <meta
          name="twitter:description"
          content="Explore the latest astrology and numerology blogs from Jyotishasha."
        />
        <meta
          name="twitter:image"
          content="https://jyotishasha.com/default-og.jpg"
        />

        {/* 🔑 Canonical */}
        <link rel="canonical" href="https://jyotishasha.com/blog" />
      </Head>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => {
            const attrs = blog.attributes;
            const cover = attrs.CoverImage?.formats?.medium?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.CoverImage.formats.medium.url}`
              : "https://jyotishasha.com/default-og.jpg";

            return (
              <Link key={blog.id} href={`/blog/${attrs.Slug}`}>
                <div className="border rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer">
                  <img
                    src={cover}
                    alt={attrs.Title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-2xl font-semibold mt-4">
                    {attrs.Title}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {attrs.MetaDescription || ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
