import React, { useEffect, useState } from 'react';
import "./MyDoubts.scss"
import Heading from '../Common/Heading/Heading';
import { useHistory } from "react-router-dom";

const MyDoubts = () => {
    const [doubts, setDoubts] = useState([])
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        callDoubtsPage();
    }, [])
    return (
        <div>
            <Heading heading="My Doubts" />
            <div className="mydoubts-sec">
                <h1>Pending Doubts</h1>
                {(loading === true) && <h3>Loading....</h3>}
                {
                    doubts.map((item, index) => {
                        return (
                            (item.status === "pending") &&
                            <div key={index} className="pending-sec">
                                <h3>{item.question}</h3>
                                <button onClick={() => delDoubt(item._id)} >delete</button>
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
            </div>
        </div>
    )
}

export default MyDoubts
