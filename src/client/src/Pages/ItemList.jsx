import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@material-ui/core";

import { addCategoryThunk, addItemThunk, getItems } from "../redux/slices/itemlistslice";
import ExpandableView from '../Components/ExpandableView';

const isValidValue = (value) => {
    return value !== null && value !== undefined && value !== '';
}

const ItemList = () => {
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    const [category, setCategory] = useState('');
    const [isCategoryValid, setIsCategoryValid] = useState(true);

    const [item, setItem] = useState('');
    const [isItemValid, setIsItemValid] = useState(true);

    const dispatch = useDispatch();

    const addCategory = async () => {
        if (!isValidValue(category)) 
            setIsCategoryValid(false);
        else {
            const resp = await dispatch(addCategoryThunk(category));
            console.log('Added category', resp);
            setIsCategoryValid(true);
            setCategory('');
        }
    };

    const addItem = async () => {
        if (!isValidValue(item))
            setIsItemValid(false);
        else {
            if (currentCategoryId === null || currentCategoryId === undefined) setIsItemValid(false);
            else {
                const resp = await dispatch(addItemThunk({ item: item, categoryid: currentCategoryId }));
                console.log('Added item', resp);
                setIsItemValid(true);
                setItem('');
            }
        }
    };
    
    useEffect(() => {
        const getItemsFromService = async () => {
            const resp = await dispatch(getItems());
            console.log('Got items for user', resp);
        };

        getItemsFromService();
    }, [dispatch]);

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
            <ExpandableView setCurrentCategoryId={setCurrentCategoryId}></ExpandableView>
        </>
    );
}

export default ItemList;