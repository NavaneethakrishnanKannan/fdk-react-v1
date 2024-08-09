import React from 'react';
import { FwDataTable } from "@freshworks/crayons/react";
import "./style.css";

export default function Order({ orderData }) {

    return (
        <FwDataTable className="table-custom-style" columns={orderData.columns} rows={orderData.rows} rowActions={orderData.rowActions} label="Data Table 1" >
        </FwDataTable>
    )

}