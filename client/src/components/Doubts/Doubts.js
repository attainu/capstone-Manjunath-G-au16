import React, { useEffect, useState } from 'react';
import "./Doubts.scss";
import { useHistory } from "react-router-dom";
import Heading from '../Common/Heading/Heading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Doubts = () => {
    const [doubts, setDoubts] = useState([])
    const [doubt, setDoubt] = useState([])
    const [answerr, setAnswer] = useState("")
    const [active, setActive] = useState()
    const history = useHistory();
    const callDoubtsPage = async () => {
        setActive(true)
        try {
            const res = await fetch("/doubts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            setDoubts(data);
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
    const getDoubt = async (ID) => {
        setActive(false)
        try {
            const res = await fetch(`/doubts/${ID}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            setDoubt(data);
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/doubts");
        }
    }
    const postAnswer = async (ID) => {
        setActive(true)
        const answer = answerr;
        const res = await fetch(`/answerDoubt/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answer
            }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            toast.dark("Fill all the fields!");
        } else {
            toast.dark("Thank You for answering");
            callDoubtsPage();
        }
    }
    useEffect(() => {
        callDoubtsPage();
    }, [])
    return (
        <>
            <Heading heading="Doubts" />
            {(active === true) ?
                <div className="doubts-sec">
                    {
                        doubts.map((item, index) => {
                            return (
                                <div key={index} className="question-sec">
                                    <h3>{item.question}</h3>
                                    <button onClick={() => getDoubt(item._id)}>Answer</button>
                                </div>
                            )
                        })
                    }

                </div>
                :
                <div className="doubts-sec">
                    {
                        doubt.map((item, index) => {
                            return (
                                <div key={index} className="answer-sec">
                                    <h3>{item.question}</h3>
                                    <textarea name="answer" placeholder="answer"
                                        onChange={(e) => setAnswer(e.target.value)}></textarea>
                                    <div className="btn">
                                        <button onClick={() => postAnswer(item._id)}>Submit</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

export default Doubts
