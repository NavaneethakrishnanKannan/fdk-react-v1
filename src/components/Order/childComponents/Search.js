import React, { useState } from 'react';
import { debounce } from "lodash"

export default function Search({ handleOnLoadOrders }) {
    const [searchValue, setSearchValue] = useState("");

    const onChangeSearch = (e) => {
        try {
            console.log(e.target.value)
            setSearchValue(e.target.value);
            debouncedSearch(e.target.value);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnClearSearch = () => {
        try {
            handleOnLoadOrders({}, "", true);
            setSearchValue("");
            debouncedResults.cancel();
        } catch (error) {

        }
    }

    const debouncedSearch = debounce(async (value) => {
        let data = { text: "All Orders", searchParams: value }
        handleOnLoadOrders(data, "search", false);
    }, 500);

    return (
        <div className='search-container space-around'>
            <div className='search-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g clip-path="url(#clip0_1_810)">
                        <path d="M11.015 12.45C8.37401 14.62 4.45801 14.463 1.98201 11.986C-0.652986 9.35101 -0.661986 5.08801 1.96301 2.46301C4.58801 -0.161986 8.85101 -0.152986 11.486 2.48201C13.963 4.95801 14.119 8.87401 11.95 11.515L15.805 15.37C16.065 15.63 16.065 16.049 15.807 16.307C15.7454 16.3685 15.6723 16.4172 15.5918 16.4503C15.5113 16.4835 15.4251 16.5005 15.3381 16.5003C15.2511 16.5001 15.1649 16.4828 15.0846 16.4493C15.0043 16.4158 14.9314 16.3667 14.87 16.305L11.015 12.45ZM2.90201 3.40201C0.793014 5.51001 0.800014 8.93501 2.91701 11.052C5.03301 13.168 8.45801 13.175 10.567 11.067C12.675 8.95801 12.668 5.53301 10.552 3.41701C8.43501 1.30001 5.01001 1.29301 2.90201 3.40201Z" fill="#183247" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_810">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <input className='input-search' type='text' placeholder='Search' value={searchValue} onChange={onChangeSearch} />
            {
                searchValue ?
                    (
                        <div className='search-icon' onClick={handleOnClearSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M8.99599 8.49999L13.394 4.10199C13.5206 3.96882 13.5902 3.79142 13.5879 3.60765C13.5856 3.42388 13.5116 3.24829 13.3817 3.11833C13.2517 2.98838 13.0761 2.91435 12.8923 2.91204C12.7086 2.90974 12.5312 2.97934 12.398 3.10599L7.99999 7.50399L3.60199 3.10599C3.46882 2.97934 3.29142 2.90974 3.10765 2.91204C2.92388 2.91435 2.74829 2.98838 2.61833 3.11833C2.48838 3.24829 2.41435 3.42388 2.41204 3.60765C2.40974 3.79142 2.47934 3.96882 2.60599 4.10199L7.00399 8.49999L2.60599 12.898C2.47934 13.0312 2.40974 13.2086 2.41204 13.3923C2.41435 13.5761 2.48838 13.7517 2.61833 13.8817C2.74829 14.0116 2.92388 14.0856 3.10765 14.0879C3.29142 14.0902 3.46882 14.0206 3.60199 13.894L7.99999 9.49599L12.398 13.894C12.5312 14.0206 12.7086 14.0902 12.8923 14.0879C13.0761 14.0856 13.2517 14.0116 13.3817 13.8817C13.5116 13.7517 13.5856 13.5761 13.5879 13.3923C13.5902 13.2086 13.5206 13.0312 13.394 12.898L8.99599 8.49999Z" fill="black" />
                            </svg>
                        </div>
                    ) : null
            }
        </div>
    )

}