import React, { useEffect, useState } from "react";
import "./style.css";
import TodolistChild from "./TodolistChild";
import Modal from "./Modal";
interface Task {
  id: number;
  task: string;
  status: boolean;
}
export default function Todolist() {
  const [task, setTask] = useState<string>("");
  let [indexEdit, setIndexEdit] = useState<number>(-1);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [oldTask, setOldTask] = useState<string>("");
  const [changeTask, setChangeTask] = useState<string>("");
  const [taskComplete, setTaskComplete] = useState<number>(0);

  const [listTask, setListTask] = useState<Task[]>(() => {
    let listTaskLocal = localStorage.getItem("listTask");
    let listTask = listTaskLocal ? JSON.parse(listTaskLocal) : [];
    return listTask;
  });

  console.log("Listtask: ", listTask);
  
  console.log("ActiveModal: ", activeModal);
  console.log("oldTask: ", oldTask);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setTask(value);
  };
  const handleClick = () => {
    let newListTask = [
      ...listTask,
      { id: Math.floor(Math.random() * 100000), task: task, status: false },
    ];
    setListTask(newListTask);
    setTask("");
    localStorage.setItem("listTask", JSON.stringify(newListTask));
  };

  const edit = (id: number) => {
    
    let index = listTask.findIndex((item: Task) => item.id == id);

    console.log("Index", index);
    

    if (index !== -1) {
        setIndexEdit(index); 
      setOldTask(listTask[index].task);
      setActiveModal(true);

    }
  };
  const del = (id: number) => {
    let newList = listTask.filter((item) => item.id !== id);
    setListTask(newList);
    localStorage.setItem("listTask", JSON.stringify(newList));
  };
  const submitModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const Add = () => {
    // Tạo một bản sao mới của listTask
    const newListTask = [...listTask];
    // Cập nhật công việc tại indexEdit
    newListTask[indexEdit].task = changeTask;
    // Cập nhật state của listTask với giá trị mới
    setListTask(newListTask);
    localStorage.setItem("listTask", JSON.stringify(newListTask));
    // Đặt lại indexEdit và ẩn modal
    setIndexEdit(-1);
    setActiveModal(false);
  };
  const Close = () => {
    setIndexEdit(-1);
    setActiveModal(false);
  };
  const Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeTask(e.target.value);
    setOldTask(e.target.value);
  };
  const changeStatus = (id: number) => {
    let indexChange = listTask.findIndex((item) => item.id === id);
    const newListTask = [...listTask];
    newListTask[indexChange].status = !newListTask[indexChange].status;
    setListTask(newListTask);
    localStorage.setItem("listTask", JSON.stringify(newListTask));
  };
  return (
    <div className="todolist">
        {activeModal && (
          <Modal
            Add={Add}
            CloseModal={Close}
            changeTask={Change}
            oldTask={oldTask}
            submitModal={submitModal}
          />
        )}
      <div className="b11">
        <h2>Danh sách công việc</h2>
        <form onSubmit={handleSubmit} action="">
          <input onChange={handleChange} type="text" value={task} required />
          <button type="submit" onClick={handleClick}>
            Thêm
          </button>
        </form>
        <table>
          <tbody>
            {listTask.map((item, index) => (
              <TodolistChild
                key={index}
                task={item}
                edit={edit}
                del={del}
                changeStatus={changeStatus}
              />
            ))}
          </tbody>
        </table>
        <p>
          Tổng số công việc đã hoàn thành:{" "}
          {listTask.filter((item) => item.status === true).length}/
          {listTask.length}
        </p>
      </div>
    </div>
  );
}
