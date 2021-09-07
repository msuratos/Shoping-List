import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import './ExpandableView.css';

const ExpandableView = () => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const getItemsForUser = async () => {
            const resp = await fetch('api/v1/item?userid=user2');
            
            if (resp.ok) {
                const data = await resp.json();
                setItems(data);
            }
        };

        getItemsForUser();
    }, []);

    return (
        <>
            <Button variant="contained">Add Category</Button>
            <Button variant="contained">Add Item</Button>
            <ul>
                {
                    items.map((item) => <li key={item._id}>{item.item}</li>)
                }
            </ul>
        </>
    );
}

export default ExpandableView;