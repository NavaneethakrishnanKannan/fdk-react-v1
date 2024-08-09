const COLUMNS = [
    { "key": "orderNo", "text": "Order No" },
    { "key": "userName", "text": "Customer Name" },
    { "key": "productId", "text": "Product Id" },
    { "key": "title", "text": "Product Name" },
    { "key": "orderDate", "text": "Order Date" },
    { "key": "deliveryDate", "text": "Delivery Date" },
    { "key": "orderStatus", "text": "Order Status" },
    { "key": "returnEligible", "text": "Return Eligible" }
]
export const constructTableData = (data, cb) => {
    try {
        let tableData = {
            columns: COLUMNS,
            rows: [],
            rowActions: []
        };
        let hideButtonIds = [];
        data.map((value, index) => {
            let { user, product, orderNo, orderDate, deliveryDate, orderStatus, returneligible } = value;
            if(returneligible === false && orderStatus !== "delivered") {
                hideButtonIds.push(index);
            }
            tableData.rows.push(
                { id: index, orderNo, userName: user.username, productId: product.id, title: product.title, 
                orderDate: formatDate(new Date(orderDate)), deliveryDate: formatDate(new Date(deliveryDate)), orderStatus: orderStatus === "returned" ? "return initiated" : orderStatus, returnEligible: returneligible.toString(), mobile: user.phone }
            )
        });
        tableData.rowActions.push({
            "name": "Return",
            "handler": (rowData) => cb(rowData),
            "disabled": "true",
            "hideForRowIds": hideButtonIds
        })
        console.log(tableData);
        return tableData;
    } catch (error) {
        console.log(error);
    }
}

const formatDate = (date) => {
    try {
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        return `${day} ${month} ${year}`;
    } catch (error) {
        console.log(error);
    }
}
const createElement = () => () => ('div', {className: 'greeting'}, [createElement('h2', "text")]);