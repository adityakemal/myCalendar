
import { createAsyncThunk } from "@reduxjs/toolkit"

import {db} from '../../firebase-config'
import {collection, getDocs, addDoc, updateDoc,doc, deleteDoc } from 'firebase/firestore'

const eventCollectionRef = collection(db, 'events')

export const getEvent = createAsyncThunk('cal/get',async ()=>{
    // try {
        const data = await getDocs(eventCollectionRef)
        console.log(data)
        return data.docs.map(res=> ({...res.data(), id: res.id }))
    // } catch (error) {
    //     console.log(error)
    // }
})

export const postEvent = createAsyncThunk('cal/post',async (data)=>{
    try {
        const addData = await addDoc(eventCollectionRef, data)
        return addData
    } catch (error) {
        console.log(error)
    }
})

export const updateEvent = createAsyncThunk('cal/update',async (newData)=>{
    console.log(newData)
    try {
        const oldDocData = doc(db, "events", newData.id)
        const updateData = await updateDoc(oldDocData, newData)
        console.log(updateData, 'update event')
        return updateData
    } catch (error) {
        console.log(error)
    }
})

export const deleteEvent = createAsyncThunk('cal/delete',async (newData)=>{
    // console.log(newData)
    try {
        const eventData = doc(db, "events", newData.id)
        const response = await deleteDoc(eventData)
        return response
    } catch (error) {
        console.log(error)
    }
})
