import React from 'react';

function PopupModal({isOpen, onClose, children})
{
    if(!isOpen) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
            <div style={{
            backgroundColor: "white", padding: "20px", borderRadius: "8px",
            minWidth: "300px", position: "relative"
        }}>

        <button
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
            X
            </button>
            {children}

        </div>
    </div>


    );

}

export default PopupModal;