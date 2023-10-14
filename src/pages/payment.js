import React, { useEffect, useState } from 'react';
import './payment.css'
import QRCode from "react-qr-code";

const Payment = (props) => {
    const [minute, setMinute] = useState(60)

    const autoClose = () => {
        if (props.trigger) {
            const timeOut = setTimeout(() => {
                props.closePopup(false);
            }, minute * 1000)

            return () => {
                clearTimeout(timeOut);
            }
        }
    }

    const minuteClose = () => {
        const timer = setInterval(() => {
            if (minute > 0) {
                setMinute(minute - 1)
            }
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }


    useEffect(() => {
        autoClose()
        minuteClose()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, minute])

    return (props.trigger ?
        <div className='popup'>
            <div className='popup-box'>
                <p className='text-3xl font-bold flex justify-center mb-3'>PAYMENT</p>
                <button className='closeBtn  py-2 px-5 mr-2 mb-2 text-sm font-medium text-white bg-red-600 rounded-lg  hover:bg-red-800' onClick={() => props.closePopup(false)}>X</button>
                <QRCode className='qr-code-container'
                    size={256}
                    value="https://github.com/Sitichai1995"
                />
                <p className='text-xl font-bold flex justify-center mb-3'>{minute}</p>

            </div>

        </div> : null);
};

export default Payment;
