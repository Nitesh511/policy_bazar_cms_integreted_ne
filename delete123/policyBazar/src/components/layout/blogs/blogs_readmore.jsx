import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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
    // Replace any placeholder for paragraphs or breaks with actual <br> tags
    return description
      .replace(/(?:\r\n|\r|\n)/g, '<br>'); // Converts new lines to <br> tags
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
    <div className="flex flex-col h-full">
      <div
        className="relative w-full h-72 overflow-hidden rounded-t-lg mt-18"
        style={{ height: "30rem" }}
      >
        <img
          className="w-full h-full object-cover "
          src={`${process.env.STRAPI_API}${blog.attributes.image.data.attributes.url}`}
          alt={blog.attributes.image.data.attributes.alternativeText || "Blog Image"}
        />
      </div>
      <div className="p-6 flex items-center space-x-4">
    <div className="flex items-center space-x-2">
      <FaUser className="text-gray-500" />
      <h3 className="text-base font-serif italic text-gray-700">by:{blog.attributes.name}</h3>
    </div>
    <div className="flex items-center space-x-2">
      <FaCalendarAlt className="text-gray-500" />
      <h3 className="text-base font-serif italic text-gray-700">{blog.attributes.date}</h3>
    </div>
  </div>
      <div className="">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          {blog.attributes.title}
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {blog.attributes.description}
        </p>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatDescription(blog.attributes.bigdescription) }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetails;
