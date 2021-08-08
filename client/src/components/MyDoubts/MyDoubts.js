import React, { useEffect, useState } from 'react';
import "./MyDoubts.scss"
import Heading from '../Common/Heading/Heading';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";

const MyDoubts = () => {
    const [doubts, setDoubts] = useState([])
    const [doubt, setDoubt] = useState({
        question: "",
        _id: ""
    })
    const [img, setImg] = useState("")
    const [prevImg, setPrevImg] = useState("")
    const [pic, setPic] = useState("")
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState()
    const history = useHistory();
    const callDoubtsPage = async () => {
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
            setLoading(false);
            setDoubts(data);
            setActive(true)
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
    const delDoubt = async (ID) => {
        try {
            const res = await fetch(`/deleteDoubt/${ID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            callDoubtsPage();
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/myDoubts");
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
            });
            const data = await res.json();
            setDoubt({
                ...doubt,
                question: data.question,
                _id: data._id
            });
            setPrevImg(data.doubtImg)
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
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDoubt({ ...doubt, [name]: value });
    };
    const handleImg = (e) => {
        setImg(e.target.files[0]);
    }
    useEffect(() => {
        changeImg();
    }, [img])
    const changeImg = () => {
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
    const postEdit = async (ID) => {
        const { question } = doubt;
        const doubtImg = pic
        const res = await fetch(`/editDoubt/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question,
                doubtImg
            }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            toast.dark("Fill all the fields!");
        } else {
            toast.dark("Updated");
            callDoubtsPage();
            setActive(true)
        }
    }
    const goBack = () => {
        setActive(true)
    }
    useEffect(() => {
        callDoubtsPage();
    }, [])
    return (
        <div>
            <Heading heading="My Doubts" />

            {loading ? <div className="loaderx"><ScaleLoader
                color={"#2b343b"} loading={loading} size={0} /></div> : <></>}

            {(active === true) ?
                <div className="mydoubts-sec">
                    <h1>Pending Doubts</h1>
                    {
                        doubts.map((item, index) => {
                            return (
                                (item.status === "pending") &&
                                <div key={index} className="pending-sec">
                                    <h3>{item.question}</h3>
                                    <button onClick={() => delDoubt(item._id)} >Delete</button>
                                    <button onClick={() => getDoubt(item._id)} >Edit</button>
                                </div>
                            )
                        })
                    }
                    <h1>Resolved Doubts</h1>
                    {
                        doubts.map((item, index) => {
                            return (
                                (item.status === "answered") &&
                                <div key={index} className="pending-sec">
                                    <h3>{item.question}</h3>
                                    <h3>{item.answer}</h3>
                                    <button onClick={() => delDoubt(item._id)} >delete</button>
                                </div>

                            )
                        })
                    }
                </div> : (active === false) &&
                <div className="edit-sec">
                    <div className="back-btn">
                        <button onClick={goBack}>Back</button>
                    </div>

                    <div className="editdoubt-con">
                        <textarea name="question" value={doubt.question}
                            onChange={handleInputs}></textarea>
                        <div className="img">
                            <input type="file" name="image" id="image" accept="image/*" onChange={handleImg} />
                            <img src={(pic === undefined) ? prevImg : pic} alt="" />
                            <label htmlFor="image">
                                <i className="fas fa-sync-alt"></i>
                                <h2>Change Image</h2>
                            </label>
                        </div>
                    </div>
                    <div className="btn">
                        <button onClick={() => postEdit(doubt._id)}>update</button>
                    </div>
                </div>
            }
            <ToastContainer position="top-right" />
        </div>
    )
}

export default MyDoubts
