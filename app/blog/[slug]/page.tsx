"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

interface BlogProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogProps) {
  const { slug } = params;
  const { i18n } = useTranslation();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const locale = i18n.language === "hi" ? "hi-IN" : i18n.language;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[Slug][$eq]=${slug}&populate=*&locale=${locale}`
        );
        const data = await res.json();
        const single =
          Array.isArray(data?.data) && data.data.length > 0
            ? data.data[0]
            : null;
        setBlog(single);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug, i18n.language]);

  if (loading) {
    return <p className="text-center py-10">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center py-10">Blog not found.</p>;
  }

  const title = blog?.attributes?.Title || "Untitled Blog";
  const description =
    blog?.attributes?.MetaDescription ||
    (typeof blog?.attributes?.Content === "string"
      ? blog.attributes.Content.slice(0, 150)
      : "Read this blog on Jyotishasha.");

  const cover = blog?.attributes?.CoverImage?.data?.attributes?.url
    ? blog.attributes.CoverImage.data.attributes.url.startsWith("http")
      ? blog.attributes.CoverImage.data.attributes.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.CoverImage.data.attributes.url}`
    : "https://jyotishasha.com/default-og.jpg";

  return (
    <>
      <Head>
        <title>{title} | Jyotishasha</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Jyotishasha`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://jyotishasha.com/blog/${slug}`}
        />
        <meta property="og:image" content={cover} />
      </Head>

      <div className="max-w-3xl mx-auto p-6">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <p className="text-sm text-gray-500 mb-6">
          By {blog?.attributes?.Author || "Jyotishasha Team"} |{" "}
          {blog?.attributes?.Published || ""}
        </p>

        <div className="prose max-w-none">
          <ReactMarkdown>{blog?.attributes?.Content || ""}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
