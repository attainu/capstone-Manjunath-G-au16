import React, { useEffect } from 'react';
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    useEffect(() => {
        const list = document.querySelectorAll('.list');
        function activeLink() {
            list.forEach((item) =>
                item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) =>
            item.addEventListener('click', activeLink));
    }, [])
    return (
        <div className="nav">
            <div className="navigation">
                <div className="logo">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <h2>DCP</h2>
                </div>
                <ul>
                    <li className="list active">
                        <NavLink className="nav-link" to="/doubts">
                            <span className="icon">
                                <i className="fas fa-question-circle"></i>
                            </span>
                            <span className="title">Doubts</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink className="nav-link" to="/askDoubt">
                            <span className="icon">
                                <i className="fas fa-question-circle"></i></span>
                            <span className="title">Ask Doubts</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink className="nav-link" to="/myDoubts">
                            <span className="icon">
                                <i className="fas fa-question-circle"></i></span>
                            <span className="title">My Doubts</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink className="nav-link" to="/answered">
                            <span className="icon">
                                <i className="fas fa-question-circle"></i></span>
                            <span className="title">You Answered</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink className="nav-link" to="/logout">
                            <span className="icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </span>
                            <span className="title">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
