import React from 'react'
interface StudentProps{
  index:number,
  student:{
    id:number,
    name:string,
    dateOfBirth:string,
    email:string,
    status:boolean,
  },
  block:(id:number)=>void,
  edit:(id:number)=>void,
  deleteStudent:(id:number)=>void,
}
export default function B3Child(props:StudentProps) {
  let {index,student,block,edit,deleteStudent}=props;
  return (
    <tr>
      <td>{index+1}</td>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.dateOfBirth}</td>
      <td>{student.email}</td>
      <td style={student.status?{color:'green'}:{color:'red'}}>{student.status?'Đang hoạt động':'Ngừng hoạt động'}</td>
      <td className='buttonTr'>
        <button onClick={()=>block(student.id)} className='btn btn-success'>{student.status?'Chặn':'Bỏ chặn'}</button>
        <button onClick={()=>edit(student.id)} className='btn btn-danger'>Sửa</button>
        <button onClick={()=>deleteStudent(student.id)} className='btn btn-warning'>Xóa</button>
      </td>
    </tr>
  )
}
