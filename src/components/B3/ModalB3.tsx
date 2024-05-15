import React from 'react'
interface ModalB3{
    closeModal:()=>void,
    addStudent:()=>void,   
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void, 
    student:{
        id:number,
        name:string,
        dateOfBirth:string,
        email:string,
        status:boolean,
    }|null,
    submitModal:(e:React.FormEvent<HTMLFormElement>)=>void,
}
export default function ModalB3(props:ModalB3) {
  return (
    <div className='modal'>
      <form className='formModalB3' action="" onSubmit={props.submitModal}>
      <h4>Thêm mới sinh viên</h4>
      <i onClick={props.closeModal} className="fa-solid fa-xmark"></i>
        <label htmlFor="">Tên sinh viên</label>
        <input onChange={props.handleChange} name='name' type="text" value={props.student?props.student.name:''} required />
        <label htmlFor="">Ngày sinh</label>
        <input onChange={props.handleChange} name='dateOfBirth' type="date" value={props.student?props.student.dateOfBirth:''} required/>
        <label htmlFor="">Email</label>
        <input onChange={props.handleChange} name='email' type="email" value={props.student?props.student.email:''} required />
        <button onClick={props.addStudent}> Đồng ý</button>
      </form>
    </div>
  )
}
