import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button id='navbutton' onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</button>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button id='navbutton' onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</button>
                <button id='navbutton' onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</button>
            </nav>
        );
    }
}

export default Navigation