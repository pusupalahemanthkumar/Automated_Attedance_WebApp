import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="showcase-container">
                <div className="showcase-image-container">
                    <img src="/images/home_bg.png" alt="showcase image photo" />
                </div>
                <div className="showcase-content-container">
                    <h1>Take Attendance on the Go</h1>
                    <p>We aim to automate the traditional attendance system.</p>
                    <a href="#" className="showcase-btn">Learn More</a>
                </div>
            </div>
            <div className="services-container">
                <h1 className="services-title">Our Services</h1>
                <div className="services-list-container">
                    <div className="service-item">
                        <i className="fas fa-5x fa-mobile"></i>
                        <h3>Available on Google play</h3>
                        <p>Installable on Android and IOS</p>
                    </div>
                    <div className="service-item">
                        <i className="fas fa-5x fa-stopwatch"></i>
                        <h3>Quick Attendance </h3>
                        <p>Attendence on the Go</p>
                    </div>
                    <div className="service-item">
                        <i className="fas fa-5x fa-chart-bar"></i>
                        <h3>Analysis and Interpretations</h3>
                        <p>Modify and analyze attendence of every student</p>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default HomePage
