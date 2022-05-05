import React, { useState } from "react";
import styles from './Forms.module.css';

const Form = (props) => {
    const[tasks, setTasks] = useState([]);
    const[newTasks, setNewTasks] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskItem = {
            text: newTasks,
            complete: false
        };

        setTasks([...tasks, taskItem]);
        e.target.reset();
    };

    const handleDelete = (deleteIndex) => {
        const updatedTasks = tasks.filter((task, index) => {
            return index !== deleteIndex;
        });
        setTasks(updatedTasks);
    };

    const handleToggleComplete = (toggleIndex) => {
        const completedTasks = tasks.map((tasks, index) =>{
            if(toggleIndex === index) {
                tasks.complete = !tasks.complete;
            }
            return tasks;
        })
        setTasks(completedTasks);
    };

    return(
        <div className={styles.container}>
        <div className={styles.header}>
            <h1>To Do List:</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Add Text Here" onChange={e => setNewTasks(e.target.value)}/>
            </div>
            <div>
                <button>Add Task</button>
            </div>
        </form>
        <div className={styles.second}>
        <div className={styles.listBox}>
        <div className={styles.thead}>
            <h2>Tasks:</h2>
        </div>
        {tasks.map((task, index) => {
            return <div key={index} className={styles.list}>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <input onChange={(e) => {
                                    handleToggleComplete(index);
                                }} checked={task.complete} type="checkbox" className={styles.checkbox}/>
                            </th>
                            <th>
                                <h3 style = {{textDecoration: task.complete ? 'line-through' : ''}}>{task.text}</h3>
                            </th>
                            <th>
                                <button onClick={() => {handleDelete(index)}} className={styles.deleteButton}>Delete</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        })}
        </div>
        </div>
        </div>//container
    )
};

export default Form;