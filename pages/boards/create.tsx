import React, { useCallback, useMemo, useRef, useState } from "react";
import AppLayout from "../../components/AppLayout";
import dynamic from "next/dynamic";
import axios from "axios";
import { Colors } from "../../util/colors";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const Create = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [hashtags, setHashtags] = useState<string>("");

    const handleImageUploadBefore = (files, info, uploadHandler) => {
        const formData = new FormData();
        formData.append("images", files[0]);
        axios
            .post("http://localhost:4000/images/upload", formData)
            .then((response) => {
                const IMG_URL = response.data;
                return uploadHandler({
                    result: [
                        {
                            url: `https://kohubis-blog.s3.ap-northeast-1.amazonaws.com/images/${IMG_URL}`,
                        },
                    ],
                });
            });
    };

    const onSubmitCreateBoard = useCallback(async () => {
        const createBoardRequest: ICreateBoardRequest = {
            title,
            content,
            hashtags,
            categoryId: 1,
        };
        const response = await axios.post("boards", createBoardRequest);
        console.log(response);
    }, [content, hashtags, title]);

    return (
        <AppLayout>
            <div>
                <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div style={{ marginTop: 10, flex: 1 }}>
                <SunEditor
                    onImageUploadBefore={handleImageUploadBefore}
                    onChange={setContent}
                    setOptions={{
                        height: "100vh",
                        buttonList: [
                            ["undo", "redo"],
                            [
                                ":p-More Paragraph-default.more_paragraph",
                                "font",
                                "fontSize",
                                "formatBlock",
                                "paragraphStyle",
                                "blockquote",
                            ],
                            [
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                                "subscript",
                                "superscript",
                            ],
                            ["fontColor", "hiliteColor", "textStyle"],
                            ["removeFormat"],
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "lineHeight"],
                            [
                                "-right",
                                ":i-More Misc-default.more_vertical",
                                "fullScreen",
                                "showBlocks",
                                "codeView",
                                "preview",
                                "print",
                                "save",
                                "template",
                            ],
                            [
                                "-right",
                                ":r-More Rich-default.more_plus",
                                "table",
                                "imageGallery",
                            ],
                            ["-right", "image", "video", "audio", "link"],
                        ],
                    }}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                <input
                    style={{ width: "100%" }}
                    type={"text"}
                    placeholder="해시태그"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                />
            </div>
            <div
                style={{
                    marginTop: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        borderWidth: 1,
                        borderColor: "red",
                        padding: 10,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#32EAB9",
                    }}
                    onClick={onSubmitCreateBoard}
                >
                    <span style={{ fontSize: 20, color: Colors.white }}>
                        등록
                    </span>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
