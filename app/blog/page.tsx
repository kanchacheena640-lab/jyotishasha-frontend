"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function BlogListPage() {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const locale = i18n.language === "hi" ? "hi-IN" : i18n.language;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=*&locale=${locale}`
        );
        const data = await res.json();

        setBlogs(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [i18n.language]);

  if (loading) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <p className="text-center py-10">No blogs found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="space-y-6">
        {blogs.map((blog) => {
          const cover = blog?.attributes?.CoverImage?.data?.attributes?.url
            ? blog.attributes.CoverImage.data.attributes.url.startsWith("http")
              ? blog.attributes.CoverImage.data.attributes.url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.CoverImage.data.attributes.url}`
            : "https://jyotishasha.com/default-og.jpg";

          const contentPreview =
            blog.attributes.MetaDescription ||
            (typeof blog.attributes.Content === "string"
              ? blog.attributes.Content.slice(0, 150)
              : "Read this blog on Jyotishasha.");

          return (
            <div key={blog.id} className="border-b pb-6">
              <Link href={`/blog/${blog.attributes.Slug}`}>
                <img
                  src={cover}
                  alt={blog.attributes.Title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">
                  {blog.attributes.Title}
                </h2>
                <p className="text-gray-600">{contentPreview}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
