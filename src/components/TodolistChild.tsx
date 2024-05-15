import React, { useState } from 'react';

interface TaskProps {
  task: {
    id: number;
    task: string;
    status:boolean;
  };
  edit: (id: number) => void;
  del: (id: number) => void;
  changeStatus: (id:number)=>void;
}
export default function TodolistChild(props:TaskProps) {
    let {task,edit,del,changeStatus}=props;
  return (
       <tr>
            <td><input checked={task.status} onChange={()=>changeStatus(task.id)} type="checkbox" /></td>
            <th style={{width:'150px',textAlign:'left',textDecoration:task.status?'line-through':'none'}}>{task.task}</th>
            <td style={{width:'50px'}} className='td' onClick={()=>edit(task.id)}><i className="fa-solid fa-pen-to-square"></i></td>
            <td className='td' onClick={()=>del(task.id)}><i className="fa-solid fa-trash"></i></td>
        </tr>
  )
}
