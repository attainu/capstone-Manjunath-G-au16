import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading/Heading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AskDoubt.scss";
import { useHistory } from "react-router-dom";

const AskDoubt = () => {
    const [ques, setQues] = useState("")
    const history = useHistory();
    const postQues = async () => {
        const question = ques;
        const res = await fetch("/askDoubt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.dark("Plz fill the fields");
        } else {
            toast.dark("Asked successfully");
        }
        history.push("/myDoubts");
    };
    return (
        <>
            <Heading heading="Ask Doubt" />
            <div className="askdoubt-sec">
                <textarea name="question" placeholder="Doubt?" onChange={(e) => setQues(e.target.value)} required></textarea>
                <div className="btn">
                    <button onClick={postQues}>Ask</button>
                </div>
            </div>

            <ToastContainer position="top-right" />
        </>
    )
}

export default AskDoubt
