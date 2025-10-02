'use client';

import { useEffect, useState } from "react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import BlogCard from "@/app/components/ui/BlogCard";
import Slider from "@/app/components/common/Slider";

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState([]);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();

      // Sort by the "sort" attribute (ascending order)
      const sortedData = data
        .sort((a: any, b: any) => a.sort - b.sort)
        .map((item: any) => ({
          _id: item._id,
          title: item.title,
          excerpt: item.description.replace(/<[^>]+>/g, ""), // strip HTML tags
          imageUrl: item.img[0],
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          author: item.author, 
        }));

      setBlogPosts(sortedData.slice(0, 3)); // Take top 3 sorted items
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    }
  };

  fetchBlogs();
}, []);


  return (
    <section id="blog" className="hide-arrows py-20 bg-white dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Blog & Resources"
          subtitle="Stay inspired with expert tips, parent guides, and the latest in tech education from the Coducators community."
          color="red"
        />

        <Slider
          items={blogPosts}
          renderItem={(post: any, index: React.Key) => (
            <div
              key={index}
              className="w-[320px] h-[420px] flex-shrink-0 mx-auto" // force uniform size
            >
              <BlogCard data={post} />
            </div>
          )}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        />


        <div className="text-center  ">
          <a
            href="/blogs"
            className="inline-block py-3 px-8 bg-coducators-red text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-1"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
