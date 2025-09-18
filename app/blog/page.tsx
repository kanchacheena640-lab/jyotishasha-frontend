'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

type Blog = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
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

export default function BlogPage() {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?locale=${i18n.language}&populate=*`
        );
        const data = await res.json();
        setBlogs(data.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [i18n.language]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        {i18n.language === 'hi' ? 'ज्योतिष लेख' : 'Astrology Blog'}
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-red-500">No blogs found for selected language.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.attributes.slug}`} key={blog.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {blog.attributes.featured_image?.data && (
                  <img
                    src={
                      blog.attributes.featured_image.data.attributes.url.startsWith('http')
                        ? blog.attributes.featured_image.data.attributes.url
                        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.attributes.featured_image.data.attributes.url}`
                    }
                    alt={blog.attributes.title}
                    className="w-full h-52 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{blog.attributes.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{blog.attributes.excerpt}</p>
                  <p className="text-xs text-gray-400">{new Date(blog.attributes.published_date).toDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
