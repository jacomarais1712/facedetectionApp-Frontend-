import React from 'react';
import './Rank.css';

const Rank = ({ name, entries}) => {
    return(
        <div className='tc'>
            <div className='white f3'>
                {`${name}, your current image streak is:`}
            </div>
            <div className='shadow-dance-container white f1'>
                <h1 className='shadow-dance-text'>{`${entries}`}</h1>
            </div>
        </div>
    );
}

export default Rank