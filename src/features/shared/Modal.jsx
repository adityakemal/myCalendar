import React from 'react';

function Modal(props) {
    if (props.isOpen) {
        return(
            <div className='modal_custom'>
                {props.content()}
            </div>
        )

    }
    return null
}

export default Modal;