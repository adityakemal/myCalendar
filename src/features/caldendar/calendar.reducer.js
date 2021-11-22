import { createSlice } from '@reduxjs/toolkit'
import { deleteEvent, getEvent, postEvent, updateEvent } from './calendar.api'


const initialState = {
    loading : false,
    modal : false,
    detailEvent : {},
    eventList : []
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        handleModalEvent: (state, {payload}) => {
            console.log(payload)
            state.modal = !state.modal
            state.detailEvent = payload
        },
    },
    extraReducers : {
        //get events
        [getEvent.pending]: (state, action)=>{
            state.loading = true
        }, 
        [getEvent.fulfilled]: (state, {payload})=>{
            state.loading = false
            state.eventList = payload
            console.log(payload)
        }, 
        [getEvent.rejected]: (state, action)=>{
            state.loading = false
        },  
        //post event
        [postEvent.pending]: (state, action)=>{
            state.loading = true
        }, 
        [postEvent.fulfilled]: (state, action)=>{
            state.loading = false
        }, 
        [postEvent.rejected]: (state, action)=>{
            state.loading = false
        },
        //update event
        [updateEvent.pending]: (state, action)=>{
            state.loading = true
        }, 
        [updateEvent.fulfilled]: (state, action)=>{
            state.loading = false
        }, 
        [updateEvent.rejected]: (state, action)=>{
            state.loading = false
        },
        //delete event
        [deleteEvent.pending]: (state, action)=>{
            state.loading = true
        }, 
        [deleteEvent.fulfilled]: (state, action)=>{
            state.loading = false
        }, 
        [deleteEvent.rejected]: (state, action)=>{
            state.loading = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleModalEvent,handleAddEvent } = calendarSlice.actions

export default calendarSlice.reducer