import React from 'react';
import "./App.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SignUpIn from './components/SignUpIn/SignUpIn';
import Sidebar from './components/Common/Sidebar/Sidebar';
import Logout from './components/Logout/Logout';
import VideoHome from './components/VideoHome/VideoHome';
const Routing = () => {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <SignUpIn />
                </Route>
                <Route path="/videos" exact>
                    <VideoHome />
                </Route>
                {/* <Route path="/askDoubt" exact>
                    <AskDoubt />
                </Route>
                <Route path="/myDoubts" exact>
                    <MyDoubts />
                </Route>
                <Route path="/answered" exact>
                    <Answered />
                </Route> */}
                <Route path="/logout" exact>
                    <Logout />
                </Route>
                <Redirect to="/" />
            </Switch>
        </main>
    )
}
const App = () => {
    return (
        <Router>
            <Sidebar />
            <div className="main-div">
                <Routing />
            </div>
        </Router>
    )
}

export default App
