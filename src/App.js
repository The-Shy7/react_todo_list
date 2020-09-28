import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft, MdNoEncryption } from "react-icons/md";
import React, { Fragment, useState, useEffect } from 'react';
import { DateTimePicker } from "@material-ui/pickers";
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';
import { MuiPickersUtilsProvider, InlineDatePicker, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment'

function App() {
  const [notes, setNotes] = useState([
    {
      date: '10/01/2020',
      items:[
        {
          label:'Weeb Nation UW meeting',
        },
        {
          label:'MHW Iceborne Fatalis event'
        }
      ]
    },{
      date:'10/02/2020',
      items:[
        {
          label: 'Groceries'
        }
      ]
    }
  ])
  const [todos, setTodos] = useState([
    {
      date: '09/30/2020',
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
      date:'10/01/2020',
      items:[
        {
          label: 'CSE 414: Quiz section'
        }
      ]
    }
  ])

  useEffect(()=>{
    const t = localStorage.getItem('todos')

    if (t) {
      setTodos(JSON.parse(t))
    }
  },[])

  const [addingToDo, setAddingToDo] = useState(false)
  const [addingNote, setAddingNote] = useState(false)
  const [date, setDate] = useState(null)
  const [text, setText] = useState('')
  const [selectedDate, handleDateChange] = useState(new Date());

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

    localStorage.setItem('notes', JSON.stringify(newNote))
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

    localStorage.setItem('todos', JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  function colorPicker(subject){
    if (subject === 'JAPAN 101') {
      return 'red'
    } else if (subject === 'UW') {
      return 'green'
    } else {
      return 'blue'
    }  
  }
  return (
  <header>  
    <div className='leftsection'>
      <div className='sectioncontent1'>
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
            setAddingToDo(!addingToDo)
          }}
            style={{border: 'none', 'margin-left':15, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
      {!addingToDo && <div>
        <div className='subtitle1'>
          Upcoming
        </div>
        <div className='cardwrap'>
          {todos.map(todosForDate=>{
          return <div>
            <div className='card'>
              {todosForDate.date}
            </div>
            {todosForDate.items.map(todos=>{
              return <div className='subject'>
                <MdCropDin className='checkbox' style={{'margin-left':5, height:20, width:20}} />
                <colorPicker subject={todos.subject} />
                <div className='subjectcolor'> </div>
                {todos.label}
              </div>
            })}
          </div>
          })}
        </div>
      </div>}
      {addingToDo && <div>
        <div className='subtitle1'>
          Add a new to do item:
        </div> 
        <div className='datepicker'>
        Due Date: 
        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
        <InlineDatePicker style={{'margin-left':15}} 
          inputVariant="outlined" 
          onChange={handleDateChange} 
          value={selectedDate} 
          />
        </MuiPickersUtilsProvider>
        </div>
        <div>
        <TextField className='todoitem'
            id="standard-multiline-flexible"
            label="To Do Item"
            multiline
            rowsMax="4"
            variant='outlined'
            onChange={e=> setText(e.target.value)}
            value={text}
        />
        <button variant="contained" color="primary" className='savebutton' onClick={()=>{
          const formattedDate = moment(selectedDate).format('MM/DD/YYYY')
          addTodo(formattedDate, text)     
          setText('')   
          setAddingToDo(false)
          }}>
          Save
        </button>

        </div>
      </div>
      }
    </div>
    <div className='rightsection'>
      <div className='title3'>
          Notes
          <button className='addbutton' onClick={() => {
            setAddingNote(!addingNote)
          }}
            style={{border: 'none', 'margin-left':150, height:25, width:25}}>
            <MdControlPoint style={{height:25, width:25}} />
          </button>
      </div>
      {!addingNote && <div>
      {notes.map(notesForDate=>{
        return <div>
          <div className='date'>
            {notesForDate.date}
          </div>
          {notesForDate.items.map(notes=>{
            return <div className='note1'>
              {notes.label}
              <div className='chevwrap'>
                <MdKeyboardArrowRight className='chevron'/>
              </div>
            </div>
          })}
        </div>
      })}
      </div>
      }
      {addingNote && <div>
        <div className='date'>
          <div className='datepicker2'>
          Date: 
          <MuiPickersUtilsProvider utils={DateFnsUtils}> 
          <InlineDatePicker style={{'margin-left':15}} 
            inputVariant="outlined" 
            onChange={handleDateChange} 
            value={selectedDate} 
            />
          </MuiPickersUtilsProvider>
          </div>
          <TextField className='notetitle'
            id="standard-multiline-flexible"
            label="Title"
            multiline
            rowsMax="4"
            onChange={e=> setText(e.target.value)}
            value={text}
          />
          <TextField className='notetext'
            id="outlined-multiline-static"
            label="Note"
            multiline
            rows="4"
            variant="outlined"
          />
          <button variant="contained" color="primary" className='savebutton' onClick={()=>{
            const formattedDate = moment(selectedDate).format('MM/DD/YYYY')
            addNote(formattedDate, text)     
            setText('')   
            setAddingNote(false)
            }}>
            Save
          </button>
        </div>
      </div>
      }   
    </div>
  </header>
  );
}

export default App;