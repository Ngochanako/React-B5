import React from 'react'
interface Modal{
    Add:()=>void,
   CloseModal:()=>void,
   changeTask:(e:React.ChangeEvent<HTMLInputElement>)=>void,
   oldTask:string,
   submitModal:(e:React.FormEvent<HTMLFormElement>)=>void,
}
export default function Modal(props:Modal) {
  return (
    <div className='modal'>
        <form action="" className='formModal' onSubmit={props.submitModal}>
        <i onClick={props.CloseModal} className="fa-solid fa-xmark"></i>
        <h4 style={{marginTop:'10px'}}>Cập nhập công việc</h4>
        <h4>Tên công việc</h4>
        <input onChange={props.changeTask} type="text" value={props.oldTask} required/>
        <button onClick={props.Add}>Đồng ý</button>
      </form>
    </div>
  )
}
