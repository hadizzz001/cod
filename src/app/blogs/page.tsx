'use client';
import React, { useState, useEffect } from 'react';
import SectionHeading from '@/app/components/ui/SectionHeading';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import BlogCard from "@/app/components/ui/BlogCard";

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();

        // Map all items
        const allPosts = data.reverse().map((item: any) => ({
          _id: item._id,
          title: item.title,
          excerpt: item.description.replace(/<[^>]+>/g, ""),
          imageUrl: item.img[0],
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          author: item.author,
        }));

        setBlogPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <section id="blog" className="py-20 bg-coducators-lightgray dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
          <SectionHeading
            title="Blog & Resources"
            subtitle="Stay updated with the latest in coding education and find resources for parents and educators."
            color="red"
          />

          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 ">
            {blogPosts.map((post: any) => (
              <div key={post._id} className="w-full h-full">
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;
