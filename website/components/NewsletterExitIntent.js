import React, { useState, useEffect } from "react"

import Modal from "react-modal"

const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-30%",
      transform: "translate(-50%, -50%)",
      paddingLeft: "20px"
    }
  }

Modal.setAppElement('body');

const NewsletterExitIntent = () => {
    const [isMouseOut, setMouseOut] = useState(false);

    const mouseOut = () => {
            setMouseOut(true);
            document.removeEventListener('mouseleave', mouseOut);
    };

    useEffect(() => {
        document.addEventListener('mouseleave', mouseOut); 
    }, [setMouseOut]);

    return (
        <Modal
            isOpen={isMouseOut}
            style={customModalStyles}
            >
                <p>
                    Newsletter
                </p>
                <button  onClick={() => setMouseOut(false)}>close</button>
        </Modal>
    )
};

export default NewsletterExitIntent;
