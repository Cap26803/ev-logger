import React from "react";
import LogForm from "../components/LogForm";

function Home() {
    return (
        <div className="home">
            <h2>Welcome to EV Logger</h2>
            <p>Track your EV's performance and manage your logs effectively.</p>
            <LogForm />
        </div>
    );
}

export default Home;
