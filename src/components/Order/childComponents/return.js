import React, { useEffect, useState } from 'react';
import { FwButton, FwModal, FwModalTitle, FwModalContent } from "@freshworks/crayons/react";

let modalContent = [
    { key: "orderNo", text: "Order No" },
    { key: "userName", text: "Customer Name" },
    { key: "productId", text: "Product ID" },
    { key: "title", text: "Product Name" },
    { key: "orderDate", text: "Order Date" },
    { key: "deliveryDate", text: "Delivery Date" },
]
export default function RetunOrder({ showModal, modalType, setShowReturnForm, data, otpValidate = false, otpStatus, validateOTP, generateOTP, setReturnOtp, handleOnResetFilter }) {

    let disabled = otpValidate ? false : true;
    const [otp, setOtp] = useState("");

    useEffect(() => {
        console.log(data);
    }, []);

    const handleOnChangeOTP = (e) => {
        try {
            let value = e.target.value;
            if (isNaN(value)) {
                return
            };
            setOtp(value);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBlurInputOTP = (e) => {
        try {
            let value = e.target.value;
            if (isNaN(value)) {
                return
            };
            setOtp(value);
            setReturnOtp(value);
        } catch (error) {

        }
    }

    const handleOnGenerateOTP = () => {
        try {
            if(!data.orderNo) {
                return
            }
            generateOTP(data)
        } catch (error) {
            
        }
    }

    const handleOnValidateOTP = () => {
        try {
            if(!data.orderNo) {
                return
            }
            console.log(otpStatus)
            if(otpStatus === "" || !otpStatus) {
                handleOnGenerateOTP()
            } else if(otpStatus === "sent") {
                validateOTP(data.orderNo)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onCloseModal = () => {
        try {
            setShowReturnForm(false)
        } catch (error) {

        }
    }

    return (
        <div>
            <FwModal id={modalType} size={modalType} submitColor="danger" isOpen={showModal} close={onCloseModal} hideFooter >
                <FwModalTitle titleText="Initiate Order Return"></FwModalTitle>
                <FwModalContent>
                    <div className='modal-return-data'>
                        <div className='modal-content-body'>
                            <div className='modal-column-split modal-left-content'>
                                {
                                    modalContent.slice(0, 3).map((value, index) => {
                                        return (
                                            <div className='modal-items'>
                                                <div className='return-modal-content-title'>{value.text}</div>
                                                <div className='return-modal-content-value'>{data[value.key]}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='modal-column-split modal-right-content'>
                                {
                                    modalContent.slice(3, 6).map((value, index) => {
                                        return (
                                            <div key={index} className='modal-items'>
                                                <div className='return-modal-content-title'>{value.text}</div>
                                                <div className='return-modal-content-value'>{data[value.key]}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='return-area'>
                        <div>Return Reason</div>
                        <textarea className='return-text-area' />
                        <div className='return-otp-area'>
                            <div> {`OTP`}
                                <span className='otp-info'>{` ${data.mobile ? `(OTP ${otpStatus === "sent" ? "sent" : "send"} to ****** ${data.mobile.slice(data.mobile.length - 3, data.mobile.length)})` : ""}`}</span>
                            </div>
                            <input type='text' className='return-text-area' data-input={true} value={otp} onChange={handleOnChangeOTP} onBlur={handleBlurInputOTP} accept='number' pattern={"[0-9]"} maxLength={6} />
                            <FwButton disabled = {`${(otpStatus === "" || !otpStatus) ? false : true}`} onFwClick = {handleOnValidateOTP}> {`${otpStatus === "sent" ? "OTP Sent" : "Send OTP"}`} </FwButton>
                        </div>
                    </div>
                    <div className="return-modal-footer">
                        <div className="return-submit">
                            <FwButton disabled={otpStatus === "sent" && otp && otp.length === 6 ? false : true} style={{ width: "200px" }} onFwClick = {handleOnValidateOTP}> Validate and Submit Return </FwButton>
                        </div>
                    </div>
                </FwModalContent>
            </FwModal>
        </div>
    );

}