import React from 'react';
import "./App.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SignUpIn from './components/SignUpIn/SignUpIn';
import Doubts from './components/Doubts/Doubts';
import MyDoubts from './components/MyDoubts/MyDoubts';
import Answered from './components/Answered/Answered';
import Sidebar from './components/Common/Sidebar/Sidebar';
import AskDoubt from './components/AskDoubt/AskDoubt';
import Logout from './components/Logout/Logout';
const Routing = () => {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <SignUpIn />
                </Route>
                <Route path="/doubts" exact>
                    <Doubts />
                </Route>
                <Route path="/askDoubt" exact>
                    <AskDoubt />
                </Route>
                <Route path="/myDoubts" exact>
                    <MyDoubts />
                </Route>
                <Route path="/answered" exact>
                    <Answered />
                </Route>
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
