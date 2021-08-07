import React, { useEffect, useState } from 'react';
import "./Doubts.scss";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Heading from '../Common/Heading/Heading';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";


const Doubts = () => {
    const [doubts, setDoubts] = useState([])
    const [doubt, setDoubt] = useState({})
    const [answerr, setAnswer] = useState("")
    const [active, setActive] = useState()
    const [loading, setLoading] = useState(true)

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 4;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(doubts.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
            setLoading(false);
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
    const goBack = () => {
        setActive(true)
    }
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
            setActive(true)
        }
    }
    useEffect(() => {
        callDoubtsPage();
    }, [])
    return (
        <>
            <Heading heading="Doubts" />
            {loading ? <div className="loaderx"><ScaleLoader
                color={"#2b343b"} loading={loading} size={0} /></div> : <></>}

            {(active === true) ?
                <div className="doubts-sec">

                    {
                        doubts.slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) => {
                            return (
                                <div key={index} className="question-sec">
                                    <h3>{item.question}</h3>
                                    <button onClick={() => getDoubt(item._id)}>Answer</button>
                                </div>
                            )
                        })
                    }
                    {(loading === false) &&
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />}
                </div>
                :
                <div className="doubts-sec">
                    <div className="answer-sec">
                        <button onClick={goBack}>Back</button>
                        <h3>{doubt.question}</h3>
                        <div className="ansdoubt-con">
                            <textarea name="answer" placeholder="answer"
                                onChange={(e) => setAnswer(e.target.value)}></textarea>
                            <div className="img">
                                <img src={doubt.doubtImg} alt="" />
                            </div>
                        </div>
                        <div className="btn">
                            <button onClick={() => postAnswer(doubt._id)}>Submit</button>
                        </div>
                    </div>
                </div>
            }

            <ToastContainer position="top-right" />
        </>
    )
}

export default Doubts
