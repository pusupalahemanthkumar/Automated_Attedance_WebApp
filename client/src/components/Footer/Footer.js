import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <h1 className="footer-title"> About Us</h1>
                <div className="footer-content-1">
                    <p>We aim to automate the traditional attendance system. </p>
                    <p>Our approach aims to solve the issues by integrating face detection and face recognition in the process. </p>
                </div>
                <div className="footer-content-1">
                    <p>Our services are freely available and ensure efficiency throughout the attendance system.</p>
                    <p>Website : https://attendance-management-pwa.herokuapp.com/ </p>
                </div>
            </div>
            <footer className="footer-copyright">
                <p> &#169; Copyrights , This Web App is developed by Average Web Developers Teams</p>

            </footer>


        </>
    )
}

export default Footer
