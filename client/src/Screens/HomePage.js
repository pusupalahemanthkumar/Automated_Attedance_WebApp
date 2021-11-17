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
                    <h1>For every student,every classNameroom . Real results.</h1>
                    <p>We’re a nonprofit with the mission to provide a free, world-className education for anyone, anywhere.</p>
                    <a href="#" className="showcase-btn">Learn More</a>
                </div>
            </div>
            <div className="services-container">
                <h1 className="services-title">How Attendance App works</h1>
                <div className="services-list-container">
                    <div className="service-item">
                        <i className="fas fa-5x fa-mobile"></i>
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum?</p>
                    </div>
                    <div className="service-item">
                        <i className="fas fa-5x fa-stopwatch"></i>
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum?</p>
                    </div>
                    <div className="service-item">
                        <i className="fas fa-5x fa-chart-bar"></i>
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, earum?</p>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default HomePage
