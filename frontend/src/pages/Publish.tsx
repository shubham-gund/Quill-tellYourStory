import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import JoditEditor from 'jodit-react';

export const Publish = () => {
    const editor = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const config = {
        height: 400, // Adjust the height as needed
        readonly: false, // All options from https://xdsoft.net/jodit/doc/
        toolbarSticky: false,
    };

    return (
        <div>
            <Appbar name={localStorage.getItem("name") || "Anonymous"} />
            <div className="flex justify-center w-full pt-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-screen-lg w-full">
                    <h2 className="text-xl font-semibold pb-2 pl-2">Title</h2>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="w-full text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mb-6"
                        placeholder="Title"
                    />

                    <h2 className="text-xl font-semibold pb-2 pl-2 ">Content</h2>
                    <JoditEditor
                        className="text-black rounded-md mb-6"
                        ref={editor}
                        value={description}
                        config={config}
                        onChange={(newContent) => setDescription(newContent)}
                    />

                    <div className="flex justify-center mt-10 ">
                        <button
                            onClick={async () => {
                                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                    title,
                                    content: description,
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    },
                                });
                                navigate(`/blog/${response.data.id}`);
                            }}
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
