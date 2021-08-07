import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading/Heading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AskDoubt.scss";
import { useHistory } from "react-router-dom";

const AskDoubt = () => {
    const [ques, setQues] = useState("")
    const [img, setImg] = useState("")
    const [pic, setPic] = useState("")
    const history = useHistory();
    const postQues = async () => {
        const question = ques;
        const doubtImg = pic;
        const res = await fetch("/askDoubt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, doubtImg }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.dark("Plz fill the fields");
        } else {
            toast.dark("Asked successfully");
        }
        history.push("/askDoubt");
    };
    const handleImg = (e) => {
        setImg(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    useEffect(() => {
        uploadImg();
    }, [img])
    const uploadImg = () => {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "merndev");
        data.append("cloud_name", "modimanju");
        fetch("https://api.cloudinary.com/v1_1/modimanju/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.secure_url);
                setPic(data.secure_url);
            })
            .catch((err) => {
                console.log(err);
            });

        console.log("pic:", pic);
    }
    const authenticate = async () => {
        try {
            const res = await fetch("/myDoubts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/");
        }
    };
    useEffect(() => {
        authenticate();
    }, [])
    return (
        <>
            <Heading heading="Ask Doubt" />
            <div className="askdoubt-sec">
                <div className="askdoubt-con">
                    <textarea name="question" placeholder="Doubt?" onChange={(e) => setQues(e.target.value)} required></textarea>
                    <div className="img">
                        <input type="file" name="image" id="image" accept="image/*" onChange={handleImg} />
                        <img src={pic} alt="" />
                        <label htmlFor="image">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <h2>Upload Screenshot</h2>
                        </label>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={postQues}>Ask</button>
                </div>
            </div>

            <ToastContainer position="top-right" />
        </>
    )
}

export default AskDoubt
