import React from 'react'
import './TaskContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import { deletetask, gettask, updatestatus } from '../reduxtools/TodoTaskAction';
import { useEffect } from 'react'
const TaskContainer = () => {
    const dispatch = useDispatch();
    const  tasks = useSelector((state) => state.todo.tasks);
    const loading=useSelector((state)=>state.todo.loading)
    useEffect(() => {
        dispatch(gettask())
        
    }, [dispatch]);
    const handleupdate=(item)=>{
        dispatch(updatestatus(item))
        dispatch(gettask())
    }
    if (loading) {
       return <h2>loading...</h2>
    }
    return (
        <div className='taskConatiner'>
           {tasks && tasks.length > 0 ? (
                tasks.map((item) => (
                    <div key={item._id}> 
                        <div className='singletask'>
                            <div className='task'>
                                <h2 className={item.status?"linetext":""} style={{ color: "lightblue" }}>{item.task_name}</h2>
                                <h6 className={item.status?"linetext":""}style={{ color: "lightblue" }}>{item.task_description}</h6>
                            </div>
                            <div className='edit'>
                                {item.status?"":<button type="button" className="btn btn-success" onClick={()=>handleupdate(item)}>
                                {loading ? 'Updating...' : 'Complete'} 
                                </button>}
                                <button type="button" className="btn btn-danger" onClick={() => dispatch(deletetask(item._id))}>Delete</button>
                            </div>
                        </div>
                        <div className='divider'></div>
                    </div>
                ))
            ) : (
                <h2>No tasks available</h2>
            )}

        </div>
    )
}

export default TaskContainer