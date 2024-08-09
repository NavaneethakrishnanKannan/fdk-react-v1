import React, { useEffect, useState } from 'react';
import {
    FwButton,
    FwListOptions,
    FwPopover,
} from '@freshworks/crayons/react';
import { filterData, sortOrderData } from '../../../helpers/filterHelper';

const Filter = ({ handleOnLoadOrders, handleUpdateResetFilter, resetFilter = false }) => {

    const [filterBy, setFilterBy] = useState(filterData[0]);

    useEffect(() => {
        if(resetFilter) {
            setFilterBy(filterData[0]);
            handleUpdateResetFilter(false);
        }
    }, [resetFilter])


    const onSortChange = (event) => {
        try {
            setFilterBy(event.detail?.meta?.selectedOptions[0]);
            handleOnLoadOrders(event.detail?.meta?.selectedOptions[0], "filter")
        } catch (error) {
            console.log("Error in Filter", error)
        }
    };


    return (
        <div>
            <FwPopover sameWidth='false' placement='bottom-start'>
                <FwButton slot='popover-trigger' color='secondary' showCaretIcon>
                    <span id='buttonContent'>{filterBy.text}</span>
                </FwButton>
                <div slot='popover-content'>
                    <span
                        className='row fw-flex fw-type-xs fw-p-4 fw-type-semibold filter-header'
                    >
                        Sort Products By
                    </span>
                    <hr style={{ margin: '0px' }} />
                    <FwListOptions
                        onFwChange={onSortChange}
                        selectedOptions={[filterBy]}
                        options={filterData}
                        allowDeselect = {false}
                    ></FwListOptions>
                </div>
            </FwPopover>
        </div>
    );
};

export default Filter