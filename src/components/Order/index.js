import React, { useEffect, useState } from 'react';
import Order from './Order';
import Filter from './childComponents/Filter';
import Search from './childComponents/Search';
import Axios from '../../config/axiosconfig';
import { constructTableData } from '../../helpers/dataTableHelper';
import { getSearchType } from '../../helpers/filterHelper';
import RetunOrder from './childComponents/return';
import { FWLabel, FwInlineMessage } from "@freshworks/crayons/react";

export default function index({ handleOnShowInfo }) {

    const [orderData, setOrderData] = useState({ columns: [], rows: [], rowActions: [] });
    const [selectedData, setSelectedData] = useState([]);
    const [showReturnForm, setShowReturnForm] = useState(false);
    const [otpStatus, setOtpStatus] = useState("");
    const [otp, setOtp] = useState(false);
    const [toastMsg, setToastMsg] = useState({ show: false, error: "", msg: "", type: "" });
    const [resetFilter, setResetFilter] = useState("");

    useEffect(() => {
        try {
            handleOnLoadOrders();
        } catch (error) {

        }
    }, []);

    const handleOnClickReturn = (data) => {
        try {
            setSelectedData(data);
            setShowReturnForm(true);
        } catch (error) {

        }
    }

    const handleOnLoadOrders = (searchData = {}, type, loadAll = false) => {
        try {
            let query = `searchtype=all&searchParams=`;
            if (!loadAll) {
                if (Object.keys(searchData).length) {
                    if (type === "filter") {
                        query = `searchtype=${getSearchType(searchData.text)}`;
                    } else if (type === "search") {
                        query = `searchtype=${getSearchType(searchData.text)}&searchParams=${searchData.searchParams}`;
                    }
                }
            } else {
                query = `searchtype=all`;
            }
            Axios.get(`/order/search?${query}`).then(orderResponse => {
                console.log(orderResponse.data, orderResponse.data.data.length);
                if (orderResponse.status === 200 && orderResponse.data.data.length) {
                    handleOnShowInfo("");
                    setOrderData(constructTableData(orderResponse.data.data, handleOnClickReturn));
                } else if (orderResponse.data.data.length === 0) {
                    handleOnShowInfo("No Records Found");
                    setOrderData(constructTableData(orderResponse.data.data, handleOnClickReturn));
                }
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleGenerateOTP = (orderData) => {
        try {
            let orderNo = orderData.orderNo;
            console.log(toastMsg)
            if (!orderNo) {
                return;
            }
            Axios.get(`/order/generateotp?orderNo=${orderNo}`).then(otpResponse => {
                console.log(otpResponse, otpResponse.data.otp_for_test);
                setOtpStatus("sent");
                setOtp(otpResponse.data.otp_for_test)
                setToastMsg({ show: true, error: false, msg: `OTP sent to ${orderData.mobile}`, type: "success" });
            }).catch(err => {
                setOtpStatus("");
                getErrorToastMsg(err);
                console.log("OTP Validation Failed", err)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleValidateOTP = (orderNo) => {
        try {
            if (!orderNo || !otp) {
                console.log("OTP INVALID....")
                setToastMsg({ show: true, error: false, msg: "Invalid OTP", type: "error" });
                return;
            }
            console.log({ otp })
            Axios.get(`/order/validateotp?orderNo=${orderNo}&otp=${otp}`).then(otpResponse => {
                console.log(otpResponse)
                setToastMsg({ show: true, error: false, msg: `OTP Validated and Return Request Accepted`, type: "success" });
                setShowReturnForm(false);
                handleOnLoadOrders({}, "All Orders", true);
                setResetFilter(true)
            }).catch(err => {
                console.log("OTP Validation Failed", err);
                getErrorToastMsg(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getErrorToastMsg = (err) => {
        try {
            let msg = "OTP Failed to Send"
            if (err && err.response && err.response.data) {
                msg = err.response.data.msg || err.response.data.message
            }
            setToastMsg({ show: true, error: false, msg: msg, type: "error" });
        } catch (error) {
            setToastMsg({ show: true, error: false, msg: "Some Error Occured", type: "error" });
        }
    }

    const handleOnUpdateOTP = (value) => {
        try {
            setOtp(value);
        } catch (error) {

        }
    }

    const handleOnCloseToast = () => {
        try {
            setToastMsg({ show: false, error: "", msg: "", type: "" });
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnResetFilter = (value = false) => {
        try {
            setResetFilter(value)
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            <div class="flex-item-border fw-flex-grow header-container">
                <header className='header-container'>
                    <section className='header-section'>

                        <div className='options-container'>
                            <div className='header-menu-options'>
                                <Search handleOnLoadOrders={handleOnLoadOrders} />
                                <Filter handleOnLoadOrders={handleOnLoadOrders} resetFilter={resetFilter} handleUpdateResetFilter={handleOnResetFilter} />
                            </div>
                        </div>
                    </section>
                </header>
            </div>
            <div class="fw-flex flex-container-border">
                <div class="flex-item-border fw-flex-grow table-container">
                    {
                        orderData.rows.length ? <Order orderData={orderData} /> : null
                    }
                </div>
            </div>
            {showReturnForm ? <RetunOrder showModal={showReturnForm} modalType={"small"} setShowReturnForm={setShowReturnForm} data={selectedData} validateOTP={handleValidateOTP} generateOTP={handleGenerateOTP} otpStatus={otpStatus} setReturnOtp={handleOnUpdateOTP} /> : null}
            {
                <FwInlineMessage open={toastMsg.show} duration={2000} closable type={toastMsg.type} style={{ position: "absolute", top: "10px", right: "10px", zIndex: "999" }} onFwHide={handleOnCloseToast}>{toastMsg.msg}</FwInlineMessage>
            }
        </React.Fragment>

    )

}