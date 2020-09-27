import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdNoEncryption } from "react-icons/md";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';

function App() {
  const [todos, setTodos] = useState([
    {
      date: 'Thursday, October 1st',
      items:[
        {
          label:'Weeb Nation UW meeting',
        },
        {
          label:'MHW Iceborne Fatalis event'
        }
      ]
    },{
      date:'Friday, October 2nd',
      items:[
        {
          label: 'Groceries'
        }
      ]
    }
  ])
  const [notes, setNotes] = useState([
    {
      date: 'Wednesday, September 30th',
      items:[
        {
          subject:'JAPAN 101: ',
          label: 'Katakana review'
        },
        {
          label:'UW: First day of Autumn quarter 2020'
        }
      ]
    },{
      date:'Thursday, October 1st',
      items:[
        {
          label: 'JAPAN 101: Quiz section'
        }
      ]
    }
  ])
  const [adding, setAdding] = useState(false)

  function addNote(date,text){
    const newNote = [...notes]
    const notesForDate = newNote.find(t=>t.date===date)

    if (notesForDate) {
      notesForDate.items.push({label:text})
    } else {
      newNote.push({
        date:date,
        items:[{label:text}]
      })
    }

    setNotes(newNote)
  }

  function addTodo(date,text){
    const newTodos = [...todos]
    const todosForDate = newTodos.find(t=>t.date===date)

    if (todosForDate) {
      todosForDate.items.push({label:text})
    } else {
      newTodos.push({
        date:date,
        items:[{label:text}]
      })
    }

    setTodos(newTodos)
  }

  function colorPicker(subject){
    if (subject === 'HCDE 438') {
      return 'red'
    } else if (subject === 'EcoCar') {
      return 'green'
    } else {
      return 'blue'
    }  
  }

  return (
  <header>  
    <div className='leftsection'>
      <div className='sectioncontent1'>
        {/*<div className='title1'>
          <MdKeyboardArrowLeft className='titlechevron'/>
          February
          <MdKeyboardArrowRight className='titlechevron'/>
        </div>
        <div className='optiontab'>
          <div className='today'>
            Today
          </div>
          <div className='thisweek'>
            This Week
          </div>
          <div className='thismonth'>
            This Month
          </div>
        </div>
  */}
        <div className='calendarwrap'>
          <Calendar 
            showHeader={false}
            accentColor={'#b7b6d1'}
          />
        </div>
      </div>
    </div>
    <div className='middlesection'>
      <div className='title2'>
          To-Do List
          <button className='searchbutton' onClick={() => {
            
          }}
            style={{border: 'none', 'margin-left':5, height:25, width:25}}>
            <MdSearch style={{color: 'gray', 'margin-left':10, height:25, width:25}} />
          </button>
          <button className='addbutton' onClick={() => {
            setAdding(!adding)
          }}
            style={{border: 'none', 'margin-left':15, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
     {!adding && <div>
        <div className='subtitle1'>
          Upcoming
        </div>
        <div className='cardwrap'>

          {notes.map(notesForDate=>{
          return <div>
            <div className='card'>
              {notesForDate.date}
            </div>
            {notesForDate.items.map(notes=>{
              return <div className='subject'>
                <MdCropDin className='checkbox' style={{'margin-left':5, height:20, width:20}} />
                <colorPicker subject={notes.subject} />
                <div className='subjectcolor'> </div>
                {notes.subject}
                {notes.label}
              </div>
            })}
          </div>
          })}
        </div>
      </div>}
      {adding && <div>
        adding!  
      </div>}
    </div>
    <div className='rightsection'>
      <div className='title3'>
          Notes
          <MdControlPoint style={{'margin-left':150, height:25, width:25}} />
      </div>
      {todos.map(todosForDate=>{
        return <div>
          <div className='date'>
            {todosForDate.date}
          </div>
          {todosForDate.items.map(todo=>{
            return <div className='note1'>
              {todo.label}
              <div className='chevwrap'>
                <MdKeyboardArrowRight className='chevron'/>
              </div>
            </div>
          })}
        </div>
      })}
    </div>
  </header>
  );
}

export default App;