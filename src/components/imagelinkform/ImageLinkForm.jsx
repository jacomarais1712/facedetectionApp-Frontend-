import React, { useEffect } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onChangeImageUrl }) => {
    const onChangeInput = (event) => {
        onInputChange(event);
        onChangeImageUrl(event);
    }
    return(
        <div>
            <p className='f3 tc'>
                {'This Magic Brain will detect  faces in your pictures. Give it a try'}
            </p>
            <div className='boxcenter'>
                <div className='form pa4 br3 shadow-5'>
                    <input id='imagelink' className='inputbox f4 pa2 w-70 center' type='text' onChange={onChangeInput}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                        >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm