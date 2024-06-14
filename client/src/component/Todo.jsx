import React, {  useState } from 'react'
import './Todo.css'
import { useDispatch } from 'react-redux'
import { createtask } from '../reduxtools/TodoTaskAction'
import TaskContainer from './TaskContainer'
const Todo = () => {
    const [task, settask] = useState({})
    const dispatch = useDispatch();
    
    const gettask = (e) => {
        settask({...task, [e.target.name]: e.target.value });
        console.log(task);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(task)
        dispatch(createtask(task))
        settask('')
    }

    return (

        <div>
            <div className='inputContainer'>
                <div className='inputName'>
                    <h5 style={{ color: 'white', marginBottom: "5px", textAlign: 'left', marginLeft: '10px' }}>Name</h5>
                    <input className='name' name='task_name' type='text' onChange={gettask} />
                </div>
                <div className='inputDescp'>
                    <h5 style={{ color: 'white', marginBottom: "5px", textAlign: 'left' }}>Descprition</h5>
                    <input className='descp' name='task_description' type='text' onChange={gettask} />
                </div>
                <div className='button'>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </div>
            </div>
            <TaskContainer />
        </div>

    )
}

export default Todo