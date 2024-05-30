import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Modal from "react-modal";
import { useState } from "react";
import { Publish } from "../components/Publish";
import { MdAdd } from "react-icons/md";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  if (loading) {
    return (
      <div>
        <Appbar name={localStorage.getItem("name") || "Anonymous"} />
        <div className="pt-4 flex justify-center">
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
      <Appbar name={localStorage.getItem("name") || "Anonymous"} />
      <div className="pt-4 flex justify-center">
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
        <button className='w-16 h-16 flex items-center justify-center rounded-full bg-black text-white hover:bg-blue-600 hover:text-white absolute right-10  bottom-10' onClick={()=>{
                setOpenAddEditModel({isShown:true , type:"add",data:null});
            }}>
                <MdAdd className='text-[32px]'> </MdAdd>
            </button>
        <Modal
          isOpen={openAddEditModel.isShown}
          onRequestClose={() =>
            setOpenAddEditModel({ isShown: false, type: "add", data: null })
          }
          ariaHideApp={false} // Opt-out
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          }}
          contentLabel="Add/Edit Blog Modal"
          className="flex items-center justify-center rounded-md mx-auto mt-15 p-5"
        >
          <Publish
            noteData={openAddEditModel.data}
            onClose={() => {  
              setOpenAddEditModel({ isShown: false, type: "add", data: null });
            }}
          ></Publish>
        </Modal>
      </div>
    </div>
  );
};
