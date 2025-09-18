// app/blog/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Blog = {
  id: number;
  attributes: {
    title: string;
    content: string;
    published_date: string;
    featured_image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&locale=${i18n.language}&populate=*`
        );
        const data = await res.json();
        setBlog(data.data[0]);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, i18n.language]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!blog) return <p className="text-center py-10 text-red-500">Blog not found</p>;

  const imgUrl = blog.attributes.featured_image?.data
    ? blog.attributes.featured_image.data.attributes.url.startsWith('http')
      ? blog.attributes.featured_image.data.attributes.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.featured_image.data.attributes.url}`
    : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {imgUrl && (
        <img
          src={imgUrl}
          alt={blog.attributes.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.attributes.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.attributes.published_date).toDateString()}
      </p>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.attributes.content }}
      />
    </div>
  );
}
