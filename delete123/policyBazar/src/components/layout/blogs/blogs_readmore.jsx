import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.STRAPI_API}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers: {
            Authorization:
              "Bearer cb6977f556ef939cc2dec9cffef081aec6784cd62adc7e6fff50f20f9e56610703876a424ddf177b7fbb8c26887bb280c09fffc955c4999fc8f0a8ff114699e7c1609e6734313c75c535f9addb25d4ca0fe737bdbe2c3cbfae0fea39e12fc134925fb539e3a4767880808f98f4051fa09d75db181eb16f5abca3575ddf69837c",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setBlog(data.data[0]);
        // Fetch related posts here or from another API endpoint
        // For demonstration, using a static array
        setRelatedPosts([
          { id: 1, title: "Related Post 1", slug: "related-post-1" },
          { id: 2, title: "Related Post 2", slug: "related-post-2" },
          { id: 3, title: "Related Post 3", slug: "related-post-3" }
        ]);
      } else {
        console.error("No blog found for the given slug.");
      }
    } catch (error) {
      console.error("Error fetching blog details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const formatDescription = (description) => {
    return description.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="relative w-full h-80 sm:h-96 lg:h-[40rem] overflow-hidden rounded-b-lg shadow-lg">
        <img
          className="w-full h-full object-cover"
          src={`${process.env.STRAPI_API}${blog.attributes.image.data.attributes.url}`}
          alt={blog.attributes.image.data.attributes.alternativeText || "Blog Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row px-6 lg:px-12 mt-6 lg:mt-12">
        <main className="flex-1 lg:mr-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <FaUser />
              <span className="text-sm font-semibold">{blog.attributes.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaCalendarAlt />
              <span className="text-sm font-semibold">{format(new Date(blog.attributes.date), 'MMMM d, yyyy')}</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blog.attributes.title}</h1>
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">{blog.attributes.description}</p>
       
          <div
            className="text-gray-800 -mt-5"
            dangerouslySetInnerHTML={{ __html: formatDescription(blog.attributes.bigdescription) }}
          ></div>
          
        </main>
   
      </div>
    </div>
  );
};

export default BlogDetails;
