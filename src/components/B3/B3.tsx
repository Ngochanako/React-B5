import React, { useState } from 'react'
import B3Child from './B3Child'
import './B3.css'
import ModalB3 from './ModalB3';
interface Student{
  id:number,
  name:string,
  dateOfBirth:string,
  email:string,
  status:boolean,
}
export default function B3() {
  const [listStudent,setListStudent]=useState<Student[]>(()=>{
    let listStudentLocal=localStorage.getItem("listStudent");
    let listStudent=listStudentLocal?JSON.parse(listStudentLocal):[]
    return listStudent;
  });
  const [activeModal,setActiveModal]=useState<boolean>(false);
  const [choiceStudent,setChoiceStudent]=useState<Student|null>(null)
  const [student,setStudent]=useState<Student|null>({
    id:0,
    name:'',
    dateOfBirth:'',
    email:'',
    status:false,
  })
  let submitModal=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }
  let handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!student){
      setStudent({
      id:0,
      name:'',
      dateOfBirth:'',
      email:'',
      status:false,
      })
    }
    let value=e.target.value;
    let name=e.target.name;  
    setStudent(prevStudent => (prevStudent ? { ...prevStudent, [name]: value } : null));
  };
  let closeModal=()=>{
    setActiveModal(false);
  }
  let openModalAdd=()=>{
    setActiveModal(true);
  }
  let blockUser=(id:number)=>{
     let newListStudent=listStudent.map((item:Student)=>{
      if(item.id===id){
        return {...item,status:!item.status};
      }
      return item;
     });
     setListStudent(newListStudent);
     localStorage.setItem('listStudent',JSON.stringify(newListStudent));
  }
  let deleteUser=(id:number)=>{
    let newListStudent=listStudent.filter(item=>item.id!==id);
    setListStudent(newListStudent);
    localStorage.setItem('listStudent',JSON.stringify(newListStudent));
  }
  let editUser=(id:number)=>{
    console.log(student);
    
     let choiceStudentt=listStudent.find(item=>item.id===id);
     if(choiceStudentt){
      setChoiceStudent(choiceStudentt);
      setStudent(choiceStudentt);
      setActiveModal(true);
     }
  }
  let addStudent=()=>{
    if(choiceStudent&&student){
      let newListStudent=listStudent.map((item)=>{
        if(item===choiceStudent){
          let newStudent={...item,name:student.name,dateOfBirth:student.dateOfBirth,email:student.email};
          return newStudent;
        }
        return item;
      })    
      
      setListStudent(newListStudent);
      localStorage.setItem('listStudent',JSON.stringify(newListStudent));
      setChoiceStudent(null);
      setStudent(null);
      setActiveModal(false);
    }else if(!choiceStudent && student){
      let user={
         id:Math.floor(Math.random()*100000000),
         name:student.name,
         dateOfBirth:student.dateOfBirth,
         email:student.email,
         status:true,
      }
      let newList=[...listStudent,user];
      
      setListStudent(newList);
      localStorage.setItem('listStudent',JSON.stringify(newList));
      setActiveModal(false);
    }
  }
  //hàm lọc theo tuổi
  let filterIncreaseAge=()=>{
      console.log(111);      
      let newList=[...listStudent].sort((a:Student,b:Student)=>new Date(b.dateOfBirth).getTime()-new Date(a.dateOfBirth).getTime());
      setListStudent(newList);
  }
  let filterDecreaseAge=()=>{
    let newList=[...listStudent].sort((a:Student,b:Student)=>new Date(a.dateOfBirth).getTime()-new Date(b.dateOfBirth).getTime());
    setListStudent(newList);
}
  return (
    <div className='b3'>
      {activeModal && <ModalB3 submitModal={submitModal} closeModal={closeModal} addStudent={addStudent} handleChange={handleChange}student={student} />}
      <h4>Quản lý sinh viên</h4>
      <button onClick={openModalAdd} className='btn btn-success'>Thêm mới sinh viên</button>
      <div className='nav'>
        <select name="" id="" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
            if(e.target.value==='increase'){
              filterIncreaseAge();
            }else if(e.target.value==='decrease'){
              filterDecreaseAge();
            }
            }}>
            <option value="" selected>Sắp xếp theo tuổi</option>
            <option value="increase" onClick={filterIncreaseAge}>Tuổi tăng dần</option>
            <option value="decrease" onClick={filterDecreaseAge}>Tuổi giảm dần</option>
        </select>
        <input type="text" placeholder='Tìm kiếm theo tên hoặc mã email' />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Tên sinh viên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead> 
        <tbody>
          {listStudent.map((item,index)=><B3Child key={item.id} index={index} student={item} block={blockUser} edit={editUser} deleteStudent={deleteUser}/>)}
        </tbody>
      </table>
    </div>
  )
}
