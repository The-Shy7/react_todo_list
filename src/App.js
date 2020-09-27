import './App.css';
import { MdControlPoint, MdSearch, MdCropDin, MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
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
      date:'Sunday, October 2nd',
      items:[
        {
          label: 'Groceries'
        }
      ]
    }
  ])
  
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
            accentColor={'black'}
          />
        </div>
      </div>
    </div>
    <div className='middlesection'>
      <div className='title2'>
          To-Do List
          <MdSearch style={{color: 'gray', 'margin-left':100, height:25, width:25}} />
          <MdControlPoint style={{'margin-left':5, height:25, width:25}} />
      </div>
      <div className='subtitle1'>
        Upcoming
      </div>
      <div className='dates'>
        Wednesday, September 30th
      </div>
      <div className='cardwrap'>
        <MdCropDin style={{'margin-left':5, height:20, width:20}} />
        <div className='subjectcolor'> </div>
        <div className='card'>
          <div className='subject'>
            University of Washington
          </div>
          First Day of Autumn Quarter 2020
        </div>
      </div>
    </div>
    <div className='rightsection'>
      <div className='title3'>
          Notes
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
