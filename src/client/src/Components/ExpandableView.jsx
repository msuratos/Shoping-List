import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import './ExpandableView.css';
import { AddCategory, AddItem, GetItemsForUser } from "../Apis/ItemApi";

const ExpandableView = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState('');
    const [item, setItem] = useState('');

    const addCategory = async () => {
        const resp = await AddCategory(category);
        if (!resp.ok) console.log('Error adding category', await resp.json());
    };

    const addItem = async () => {
        const resp = await AddItem(item);
        if (!resp.ok) console.log('Error adding category', await resp.json());
    };
    
    useEffect(() => {
        const getItemsForUser = async () => {
            const resp = await GetItemsForUser();
            
            if (resp.ok) {
                const data = await resp.json();
                setItems(data);
            }
        };

        getItemsForUser();
    }, []);

    return (
        <>
            <div style={{margin: 5}}>
                <TextField label="Category" variant="outlined" size="small" 
                    value={category} onChange={(e) => setCategory(e.target.value)} />
                <Button variant="contained" onClick={addCategory}>Add +</Button>
            </div>
            <div style={{margin: 5}}>
                <TextField label="Item" variant="outlined" size="small" 
                    value={item} onChange={(e) => setItem(e.target.value)} />
                <Button variant="contained" onClick={addItem}>Add +</Button>
            </div>
            <ul>
                {
                    items.map((item) => <li key={item._id}>{item.category}</li>)
                }
            </ul>
        </>
    );
}

export default ExpandableView;