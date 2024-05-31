// Blogs.tsx
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs, usePersonalBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Modal from "react-modal";
import { useState } from "react";
import { Publish } from "../components/Publish";
import { MdAdd } from "react-icons/md";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const { personalBlogs, personalBlogloading } = usePersonalBlogs();
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allBlogs, setAllBlogs] = useState(true);

  const handleToggleBlogs = (showAll: boolean) => {
    setAllBlogs(showAll);
  };

  if (loading || personalBlogloading) {
    return (
      <div>
        <Appbar name={localStorage.getItem("name") || "Anonymous"} onToggleBlogs={handleToggleBlogs} />
        <div className="pt-24 flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar name={localStorage.getItem("name") || "Anonymous"} onToggleBlogs={handleToggleBlogs} />

      <div className="pt-20 flex justify-center">
        {allBlogs ? (
          <div>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author ? blog.author.name || "Anonymous" : "Anonymous"} // Check if author exists
                title={blog.title}
                content={blog.content}
                createdOn={blog.createdOn}
              />
            ))}
          </div>
        ) : (
          <div>
            {personalBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author ? blog.author.name || "Anonymous" : "Anonymous"} // Check if author exists
                title={blog.title}
                content={blog.content}
                createdOn={blog.createdOn}
              />
            ))}
          </div>
        )}
      </div>
      
      <button
        className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white fixed right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModel({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className='text-[32px]' />
      </button>
      
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
        contentLabel="Add/Edit Blog Modal"
        className="flex items-center justify-center rounded-md mx-auto mt-15 p-5"
      >
        <Publish
          BlogData={openAddEditModel.data}
          onClose={() => setOpenAddEditModel({ isShown: false, type: "add", data: null })}
        />
      </Modal>
    </div>
  );
};
