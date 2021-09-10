import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

import { AddCategory, AddItem, GetItemsForUser } from "../Apis/ItemApi";
import ExpandableView from '../Components/ExpandableView'

const ItemList = () => {
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
            <Grid container spacing={1} style={{marginBottom: 5, marginTop: 5}}>
                <Grid item xs={8}>
                    <TextField label="Category" variant="outlined" size="small" fullWidth
                        value={category} onChange={(e) => setCategory(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={addCategory}>Add</Button>
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Item" variant="outlined" size="small" fullWidth
                        value={item} onChange={(e) => setItem(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={addItem} fullWidth>Add Item</Button>
                </Grid>
            </Grid>
            <ExpandableView items={items}></ExpandableView>
        </>
    );
}

export default ItemList;