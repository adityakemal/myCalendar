import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../shared/Loading';
import Modal from '../shared/Modal';
import { getEvent } from './calendar.api';
// import { getEvent } from './calendar.api';
import { handleModalEvent } from './calendar.reducer';
import ModalEvent from './components/ModalEvent';



function Calendar(props) {
    const [initialMonth, setInitialMonth] = useState(new Date().toISOString().substr(0,7))
    const year = new Date(initialMonth).getFullYear() //2021 / now 
    const month = new Date(initialMonth).getMonth()+1 // index of bulan mulai dari 0  + 1
    const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thurshday',
        'Friday',
        'Saturday',
    ]
    const [finalDate, setFinalDate] = useState([])
    const {modal, eventList, loading} = useSelector(state => state.calendar)
    const dispatch = useDispatch()
    
    const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)
    const finalArrayofMonth = getDaysInMonth(month,year).map(res => ({name : res.toDateString().substr(0,3), date : res.getDate(), dateOrigin: res.toDateString(), dataEvent : [] }))
  
    useEffect(() => {
        // add event 
        const monthWithEvent = finalArrayofMonth.map(res=> ({...res, dataEvent: eventList.filter(val => val.date === res.dateOrigin)}))
        console.log(monthWithEvent)
        const emptyFirst = []
        const emptyEnd = []
        //add emtyfirst
        for (const dn of dayName) {
            if (monthWithEvent[0].name === dn.substr(0,3)) break;
            emptyFirst.push({name : 'disabled', date : ''})
        }
        //add emtylasr
        const lengthToAdd = 42 - [...emptyFirst, ...monthWithEvent].length
        for (let i = 0; i < lengthToAdd; i++) {
            emptyEnd.push({name : 'disabled', date : ''})
        }
        setFinalDate([...emptyFirst, ...monthWithEvent,...emptyEnd])
    }, [initialMonth, eventList])
    

    useEffect(() => {
        dispatch(getEvent())
        console.log(finalDate)
    }, [])
    

    const handleEvent = (eventDetail)=>{
        dispatch(handleModalEvent(eventDetail))
    }
    
    const handleMonth = (e)=>{
        console.log(e.target.value)
        setInitialMonth(e.target.value || new Date())
    }

    
    return (
        <>
        <Modal content = {()=><ModalEvent />} isOpen={modal} />
        <Modal content = {()=><Loading />} isOpen={loading} />
        <div className='calendar '>
            <div className="navcal ">
                <input className='px-1' type="month" onChange={handleMonth} value={initialMonth} min={new Date()} />
                <i>Calendar app by Kemal Aditya Z</i>
            </div>
            <div className="head">
                {
                    dayName.map((res,i)=>
                        <div key={i} className="box" key={i}>{res}</div>
                    )
                }
            </div>
            <div className="wrapdate">
            {
                finalDate.length !== 0 ?
                finalDate.map((res,i)=>{
                    const {name, dateOrigin, dataEvent, date} =res
                    return(
                    <div 
                        key={i} 
                        className={name !== 'disabled' ? 'box border' : 'box border bg-secondary'}
                        style={ dateOrigin === new Date().toDateString() ? {backgroundColor : 'gold'}: null}
                        onClick={name !== 'disabled' ?()=>handleEvent(res) : ()=>{}}
                        >
                            <b>{date} </b>

                        <div className="wrap-event">
                            {
                                dataEvent ? dataEvent.map((val,j)=>
                                <div 
                                key={j}
                                className="event-list"
                                style={{backgroundColor : val.color}}
                                >{val.name}</div>
                                ) : null
                            }
                        </div>
                        
                        
                    </div>
                )})
                :'loading'
            }
            </div>
        </div>
        </>
    );
}

export default Calendar;