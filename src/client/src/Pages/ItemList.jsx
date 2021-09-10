import React, { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

import { AddCategory, AddItem, GetItemsForUser } from "../Apis/ItemApi";
import ExpandableView from '../Components/ExpandableView';

const isValidValue = (value) => {
    return value !== null && value !== undefined && value !== '';
}

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    const [category, setCategory] = useState('');
    const [isCategoryValid, setIsCategoryValid] = useState(true);

    const [item, setItem] = useState('');
    const [isItemValid, setIsItemValid] = useState(true);

    const addCategory = async () => {
        if (!isValidValue(category)) 
            setIsCategoryValid(false);
        else {
            const resp = await AddCategory(category);
            if (!resp.ok) console.log('Error adding category', await resp.json());
            else {
                const data = await resp.json();
                setItems((state) => [...state, data]);
                setCategory('');
                setIsCategoryValid(true);
            }
        }
    };

    const addItem = async () => {
        if (!isValidValue(item))
            setIsItemValid(false);
        else {
            if (currentCategoryId === null || currentCategoryId === undefined) setIsItemValid(false);
            else {
                const resp = await AddItem(item, currentCategoryId);
                if (!resp.ok) console.log('Error adding category', await resp.json());
                else {
                    const data = await resp.json();
                    setItems((state) => [...state, data]); //TODO: fix this logic, seems like it inserts a new record instead of updating
                    setItem('');
                    setIsItemValid(true);
                }
            }
        }
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
                    <TextField error={!isCategoryValid} helperText={!isCategoryValid ? 'Can\'t be empty' : ''} label="Category" variant="outlined" size="small" fullWidth
                        value={category} onChange={(e) => setCategory(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={addCategory}>Add</Button>
                </Grid>
                <Grid item xs={8}>
                    <TextField error={!isItemValid} helperText={!isItemValid ? 'Can\'t be empty' : ''} label="Item" variant="outlined" size="small" fullWidth
                        value={item} onChange={(e) => setItem(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={addItem} fullWidth>Add Item</Button>
                </Grid>
            </Grid>
            <ExpandableView items={items} setCurrentCategoryId={setCurrentCategoryId}></ExpandableView>
        </>
    );
}

export default ItemList;