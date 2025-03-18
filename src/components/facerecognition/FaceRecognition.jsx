import React, { useState } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes, onHandleError, imageValid }) => {
    console.log(imageValid);
    console.log(imageUrl);
    if (imageUrl !== null) {
        return(
            <div className='boxcenter ma'>
                <div className='absolute mt2'>
                    {imageValid && imageUrl ? (
                        <>
                            <img id='inputimage' src={imageUrl} alt='image' width='500px' height='auto' onError={onHandleError}/>
                            {boxes.map((box, index) => (
                                <div 
                                    key={index} 
                                    className='bounding-box' 
                                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                                </div>
                            ))}
                        </>
                        ) : (
                            <p className='imagemessage'>Enter a valid Image URL....</p>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default FaceRecognition