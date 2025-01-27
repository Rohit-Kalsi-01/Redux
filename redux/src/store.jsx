import {createStore, applyMiddleware} from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';

const ADD_TASK="task/add";
const DELETE_TASK="task/delete";
const FETECH_TASK="task/fetch";
const initialState={
    task:[],
}


export const taskReducer=(state=initialState,action)=>{
   switch(action.type){
    case ADD_TASK:
        return{
            ...state,
            task:[...state.task,action.payload],
        }

        case DELETE_TASK:
            // eslint-disable-next-line no-case-declarations
            const update=state.task.filter((curelm,index)=>{
                return index!==action.payload;
            })
            return{
                ...state,
                task:update,
            } 
        case FETECH_TASK: 
            return {
                ...state,
                task:[...state.task,...action.payload]
            }

        default: 
            return state;
   }
}
//Create store in redux
export  const store= createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)));
 console.log(store)

//disatch with fuction

export const addTask=(data)=>{
    return {type:ADD_TASK,payload:data};
}

console.log("initial State:",store.getState());



export const deleteTask=(id)=>{
    return {type:DELETE_TASK,payload:id};
}
store.dispatch(deleteTask(0));
console.log("After Deleted:",store.getState());


export const fetchTask=()=>{
    return async(dispatch)=>{
   try{
   const res=await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
   const task=await res.json();
   dispatch({type:FETECH_TASK,payload:task.map((curtask)=>curtask.title)})
   }
   catch(error){
    console.log(error);
   }
    }
}