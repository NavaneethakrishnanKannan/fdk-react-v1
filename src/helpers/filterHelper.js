export const filterData = [
    {
        value: '1',
        text: 'All Orders',
    },
    {
        value: '2',
        text: 'Placed Orders',
    },
    {
        value: '3',
        text: 'Delivered Orders',
    },
    {
        value: '4',
        text: 'Returned Orders',
    }
];
export const sortOrderData = [
    {
        value: 'vertical-align-bottom',
        text: 'Ascending',
        graphicsProps: { name: 'vertical-align-bottom' },
    },
    {
        value: 'vertical-align-top',
        text: 'Descending',
        graphicsProps: { name: 'vertical-align-top' },
    },
];

export const getSearchType = (type) => {
    try {
        switch (type) {
            case "All Orders":
                return "all";
            case "Placed Orders":
                return "placed";
            case "Delivered Orders":
                return "delivered";
            case "Returned Orders":
                return "returned";
            default:
                return "all";
        }
    } catch (error) {
        console.log(error);
    }
}