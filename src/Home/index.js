import React from 'react'
import logoImage from './logo.png'
import './home.css'

function Home() {
    return (
        <>
            <div>
                <img id="logo" src={logoImage} />
                <p style={{
                    textAlign: 'center',
                    fontSize: '30px',
                    fontFamily: 'cursive',
                    color: 'blue',
                    padding: '10px',
                    whiteSpace: 'pre-line',  // Allows line breaks in the text
                    overflowWrap: 'break-word',  // Ensures long words break onto the next line
                }}>
                    Your Wish List, Our Command – Explore the Ultimate Shopping Experience!🛍️🏬
                </p>

            </div>
        </>
    )
}

export default Home