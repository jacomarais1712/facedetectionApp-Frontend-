import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Header.css'

const Header = () => {
    return(
        <div className='ma0 ml5 mt0'>
            <Tilt className='Tilt br2 shadow-2' style={{ width: '150px', height: '150px'}}>
                <div className='pa3'>
                    <p className='header'>SmartAI Brain</p>
                </div>
            </Tilt>
        </div>
    );
}

export default Header