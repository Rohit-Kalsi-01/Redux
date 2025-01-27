import {useSelector,useDispatch} from "react-redux"
import { MdDeleteForever } from "react-icons/md";import { useState } from "react";
import { addTask, deleteTask, fetchTask } from "../store";
export const TODO=()=>{
   const tasks= useSelector((state)=>state.task);
//    console.log("react States",state.task)
const disatch=useDispatch();
const[task,setTask]=useState("");

const handleform=(e)=>{
    e.preventDefault();
    disatch(addTask(task));
    return  setTask("");

}
const handleTaskDelete=(id)=>{
    return disatch(deleteTask(id));
}
const handlefetchbutton=()=>{
    disatch(fetchTask());
}

    return(
        <div className="container">
            <div className="todo-app">
                <h1>
                    <i className="fa-regular fa-pen-to-square"></i>To-do List:
                </h1>
                <div className="row">
                    <form onSubmit={handleform}>
                        <input type="text " id="input-box" placeholder="Add a next task" 
                        value={task} onChange={(e)=>setTask(e.target.value)} />
                        <button >Add Task</button>
                    </form>
                </div>
                <button onClick={handlefetchbutton}> Fetch Tasks</button>
                <ul id="list-container">
                    {
                        tasks.map((cuetask,index)=>{
                            return (<li key={index}>
                                <p>{index}:{cuetask}</p>
                                <div>
                                    <MdDeleteForever
                                    className="icon-style"
                                    onClick={()=>handleTaskDelete(index)}/>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}