import React from 'react';
import { BlogPost } from '../components/BlogPost';
import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import { Appbar } from '../components/Appbar';

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || '' });

  if (loading) {
    return (
      <div>
        <Appbar name={localStorage.getItem('name') || 'Anonymous'} />
        <div className="w-full flex justify-center pt-6">
          <div
            role="status"
            className="flex flex-col md:flex-row m-4 items-start w-full max-w-screen-xl p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
          >
            <div className="w-full md:w-2/3">
              <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
            </div>

            <div className="flex pt-10 items-center mt-6 md:mt-0 md:ml-6 w-full md:w-1/3">
              <svg
                className="w-8 h-8 mb-4 mr-4 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return <BlogPost blog={blog} />;
};
