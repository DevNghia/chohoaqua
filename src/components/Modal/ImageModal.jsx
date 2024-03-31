
import { useState, useRef, useEffect } from "react";



export default function ImageModal(props) {
    const [isShow, setIsShow] = useState(true);
    return (
        !isShow ? <div></div> :    <div className="modal center">
            <div className="order-popup" style={{ padding: 0 }}>
                <button
                    onClick={() => { setIsShow(!isShow)}}
                    className="close-btn"
                >
                    <i className="fas fa-times"></i>
                </button>
                <img src={props.imageUrl}>
             </img>

            </div>
        </div>
    )
}