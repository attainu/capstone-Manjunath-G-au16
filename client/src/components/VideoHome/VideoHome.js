import React, { useState, useEffect } from 'react'
import Heading from '../Common/Heading/Heading';
import "./VideoHome.scss";

const VideoHome = () => {
    const [videos, setVideos] = useState([])
    const fetchVideos = async () => {
        try {
            const res = await fetch("/videos", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
            setVideos(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchVideos();
    }, [])
    return (
        <>
            <Heading heading="Videos" />
            <div className="video-home">
                {videos.map((item, index) => {
                    return (
                        <div className="video-con">
                            <div className="title">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="video">
                                <video src={item.url}></video>
                            </div>
                        </div>

                    )
                })
                }
            </div>
        </>
    )
}

export default VideoHome
