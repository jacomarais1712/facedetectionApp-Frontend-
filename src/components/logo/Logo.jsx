import React from 'react';
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './logo.css'

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' style={{ width: '150px', height: '150px'}}>
                <div className='pa3'>
                    <img style={{paddingTop: '5px'}} src={brain} alt='logo'/>
                </div>
            </Tilt>
            <Tilt className='Tilt br2 shadow-2' style={{ width: '150px', height: '50px'}}>
                <div className='pa2'>
                    <p className='header tc'>SmartAI Brain</p>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo