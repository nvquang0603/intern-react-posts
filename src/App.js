import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
    return <h2>Home</h2>
}
function About() {
    return <h2>About</h2>
}
function User() {
    return <h2>User</h2>
}
function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/about"}>About</Link>
                        </li>
                        <li>
                            <Link to={"/user"}>User</Link>
                        </li>
                    </ul>
                </nav>

                <Route path={"/"} exact component={Index}/>
                <Route path={"/about"} component={About}/>
                <Route path={"/user"} component={User}/>
            </div>
        </Router>
    )
}

export default AppRouter;