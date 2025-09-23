"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

interface BlogProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogProps) {
  const { slug } = params;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[Slug][$eq]=${slug}&populate=*`
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
      }
    }
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <p className="text-center py-10">Blog not found.</p>;
  }

  // Directly use flat fields from API
  const title = blog.Title;
  const description =
    blog.MetaDescription ||
    blog.Content?.slice(0, 150) ||
    "Read this blog on Jyotishasha.";

  const cover =
    blog?.CoverImage?.formats?.large?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.CoverImage.formats.large.url}`
      : blog?.CoverImage?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.CoverImage.url}`
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
          By {blog.Author || "Jyotishasha Team"} | {blog.Published || ""}
        </p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.Content }}
        />
      </div>
    </>
  );
}
