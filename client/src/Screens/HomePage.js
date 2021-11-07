import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="container-home-page">
                <h1><span className="primary-color">Automated</span> Attendance Portal</h1>
                <div className="home-page-img">
                    <img src="https://www.mentorrbuddy.com/images/cs-it.png" alt="Home" />
                </div>
                <div className="home-page-content">
                    <p>
                        Automated Attendance system deals with taking attendance without human interference.
                        In this project, an automated attendance marking and management system is proposed by
                        making use of face detection and recognition algorithms. 
                    </p>
                </div>
            </div>
        </>
    )
}

export default HomePage
