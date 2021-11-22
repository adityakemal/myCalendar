import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteEvent, getEvent, postEvent, updateEvent } from '../calendar.api';
import { handleModalEvent } from '../calendar.reducer';
var randomColor = require('randomcolor');


function ModalEvent(props) {
    const {modal, detailEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch()
    const [detailArr, setDetailArr] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState({
        id : '',
        name : '',
        time : '',
        invite : '',
        date : '', 
        color : randomColor({luminosity: 'light',}),
    })

    useEffect(() => {
        setValues({
            ...values,
            date : detailEvent.dateOrigin
        })
        setDetailArr(detailEvent.dataEvent)
    }, [modal])


    const handleChange = (e) =>{
        let {name , value} = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (isEdit) {
            dispatch(updateEvent(values)).unwrap()
            .then(res=>{
                dispatch(handleModalEvent())
                Swal.fire({
                    icon: 'success',
                    title: 'Your event has been updated',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>dispatch(getEvent()))
                
                
            }).catch(err=>{
                console.log(err)
            })
        }else{
            const data = {
                name : values.name,
                time : values.time,
                invite : values.invite,
                date : values.date, 
                color : values.color,
            }
            dispatch(postEvent(data)).unwrap()
            .then(res=>{
                dispatch(handleModalEvent())
                Swal.fire({
                    icon: 'success',
                    title: 'Your event has been saved',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    dispatch(getEvent())
                })
            })
        }
    }

    const handleEdit = (data)=>{
        setValues({
            ...values,
            ...data
        })
        setIsEdit(true)
        console.log(data)
    }

    const handleCancel = ()=>{
        setValues({
            ...values,
            id : '', 
            name : '',
            time : '',
            invite : '', 
            color : randomColor({luminosity: 'light',})
        })
        setIsEdit(false)
    }

    const handleDeleteEvent = (res)=>{
        dispatch(deleteEvent(res)).unwrap()
        .then(res=>{
            dispatch(handleModalEvent())
            Swal.fire({
                icon: 'success',
                title: 'Your event has been deleted',
                showConfirmButton: false,
                timer: 1500
            }).then(()=>dispatch(getEvent()))
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
    <div className="box_modal_events">
        <div className="head">
            <h3>Event - <small>{detailEvent.dateOrigin}</small> </h3>
            <X onClick={()=> dispatch(handleModalEvent())}/>
        </div>
        <div className="list-events">
            {/* <h5 className="title">List Event :</h5> */}
            <ul>
            {
                detailArr || detailArr.length ===0  ? detailArr.map((res,i)=>
                    <li key={i} style={{backgroundColor : res.color}}>
                        <div>
                            <p className='mb-0'>
                                - {res.name}
                            </p>
                            <small>At {res.date}-{res.time} - <span className='text-info'>Invite to: {res.invite}</span></small>
                        </div>
                        <div className="action">
                            <Edit2 className='bg-warning p-1 text-white' onClick={()=>handleEdit(res)}/>
                            <Trash2 className='bg-danger p-1 text-white' onClick={()=>handleDeleteEvent(res)}/>
                        </div>
                    </li>
                ) : 'No event in this day'
            }
            </ul>
        </div>
        <hr />
        {/* <button className='btn btn-primary btn-large mb-4'>Add Event</button> */}
        <form  onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-8">
                    <label htmlFor="name">
                        <h6>Name</h6>
                        <input type="text" id='name' name='name' placeholder='Event name'  onChange={handleChange} value={values.name} required/>
                    </label>
                </div>
                <div className="col-md-4">
                    <label htmlFor="time">
                        <h6>Time</h6>
                        <input type="time" id='time' name='time' onChange={handleChange} value={values.time} required/>
                    </label>
                </div>
            </div>
            <label htmlFor="invite">
                <h6>Invitees by email</h6>
                <input type="email" id='invite' name='invite' placeholder='Email' onChange={handleChange} value={values.invite} required/>
            </label>
            {
                isEdit ?
                <div>
                    <button type='submit'  className='btn-warning btn '>Edit Event</button> &nbsp;
                    <button type='button'  className='btn-danger btn' onClick={handleCancel}>Cancel</button>
                </div>
                :
                <div>
                    <button type='submit' disabled={detailArr.length >= 3} className='btn-primary btn'>Add Event</button>
                    {
                    detailArr.length >= 3 ?
                    <small className='text-danger '> &nbsp; *Maximun event is 3.</small>
                    : null
                    }
                </div>
            }
        </form>
    </div>
    );
}

export default ModalEvent;