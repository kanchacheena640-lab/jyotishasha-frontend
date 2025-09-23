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
        <title>Our Blog | Jyotishasha</title>
        <meta
          name="description"
          content="Read the latest blogs on astrology, numerology, and spiritual guidance from Jyotishasha."
        />
        <meta property="og:title" content="Our Blog | Jyotishasha" />
        <meta
          property="og:description"
          content="Read the latest blogs on astrology, numerology, and spiritual guidance from Jyotishasha."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotishasha.com/blog" />
      </Head>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.attributes.slug}`}>
              <div className="border rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer">
                {blog.attributes.featured_image?.data && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.featured_image.data.attributes.url}`}
                    alt={blog.attributes.title}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h2 className="text-2xl font-semibold mt-4">
                  {blog.attributes.title}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {blog.attributes.excerpt || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
