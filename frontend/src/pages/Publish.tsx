import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import JoditEditor from 'jodit-react';


export const Publish: React.FC = () => {
    const editor = useRef(null);
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const type = location.state?.type || "create";

    const config = {
        height: 400,
        readonly: false,
        toolbarSticky: false,
    }

    useEffect(() => {
        if (type === "edit" && id) {
            // Fetch the existing blog data
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const { title, content } = response.data.blog;
                    setTitle(title);
                    setDescription(content);
                } catch (error) {
                    console.error("Error fetching blog data", error);
                }
            };
            fetchBlog();
        }
    }, [type, id]);

    const handlePublish = async () => {
        try {
            if (type === "edit") {
                const response = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                    id,
                    title,
                    content: description,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(title,description)
                navigate(`/blog/${response.data.id}`);
            } else {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                navigate(`/blog/${response.data.id}`);
            }
        } catch (error) {
            console.error("Error publishing post", error);
        }
    };

    return (
        <div>
            <Appbar name={localStorage.getItem("name") || "Anonymous"} />
            <div className="flex justify-center w-full pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-lg w-full">
                    <h2 className="text-xl font-semibold pb-2 pl-2">Title</h2>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mb-6"
                        placeholder="Title"
                        
                    />

                    <h2 className="text-xl font-semibold pb-2 pl-2">Content</h2>
                    <JoditEditor
                        className="text-blue rounded-md mb-6 custom-editor"
                        ref={editor}
                        value={description}
                        config={config}
                        onBlur={(newContent) => setDescription(newContent)}
                    />

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handlePublish}
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            {type === "edit" ? "Update post" : "Publish post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
