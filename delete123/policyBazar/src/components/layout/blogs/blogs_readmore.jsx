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
    return description
      .split(/(?:\r\n|\r|\n)/g) // Split the description by new lines
      .map(line => {
        if (line.startsWith('###')) {
          return `<h3 class="font-bold text-lg">${line.substring(3).trim()}</h3>`;
        } else if (line.startsWith('##')) {
          return `<h2 class="font-bold text-lg">${line.substring(2).trim()}</h2>`;
        } else if (line.startsWith('#')) {
          return `<h1 class="font-bold text-xl">${line.substring(1).trim()}</h1>`;
        } else {
          return `<p class="text-lg">${line.trim()}</p>`;
        }
      })
      .join('<br>');
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
      <div className="container mx-auto flex flex-col lg:flex-row px-6 lg:px-12 mt-16 lg:mt-12">
        <main className="flex-1 lg:mr-8">
          <h1 className="text-4xl font-bold font-subheading text-center text-gray-900 mb-4">{blog.attributes.title}</h1>
          <div className="flex items-center space-x-4 mb-6 font-subheading lg:ml-[460px] ">
            <div className="flex items-center space-x-2 text-gray-900">
              <FaUser />
              <span className="text-lg  font-semibold">{blog.attributes.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-900">
              <FaCalendarAlt />
              <span className="text-lg font-semibold">{format(new Date(blog.attributes.date), 'MMMM d, yyyy')}</span>
            </div>
          </div>

          <div className="relative w-full h-80 sm:h-96 lg:h-[30rem] overflow-hidden rounded-b-lg shadow-lg mb-10 rounded-md">
        <img
          className="w-full h-full object-cover"
          src={`${process.env.STRAPI_API}${blog.attributes.image.data.attributes.url}`}
          alt={blog.attributes.image.data.attributes.alternativeText || "Blog Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      </div>
      <p className="text-lg text-gray-900 mb-8 leading-relaxed font-subheading  ">{blog.attributes.description}</p>
       
          <div
            className="text-gray-900 -mt-5 text-lg font-subheading"
            dangerouslySetInnerHTML={{ __html: formatDescription(blog.attributes.bigdescription) }}
          ></div>
          
        </main>
   
      </div>
    </div>
  );
};

export default BlogDetails;
