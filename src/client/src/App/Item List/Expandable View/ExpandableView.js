import React, { useEffect, useState } from "react";
import './expandableview.css';

const ExpandableView = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const getItemsForUser = async () => {
            const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/item?userid=user2';
            const resp = await fetch(url);
            
            if (resp.ok) {
                const data = await resp.json();
                console.log(data);
            }
        };

        getItemsForUser();
    }, []);

    return (
        <>
            <input type="button" value="Add Category" />
            <input type="button" value="Add Item" />
            <ul>
                {
                    items.map((val) => <li>{val}</li>)
                }
            </ul>
        </>
    );
}

export default ExpandableView;