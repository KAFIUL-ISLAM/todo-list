import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import Spinner from './Spinner';

const Homepage = () => {

    const [addTask, setAddTask] = useState(false);
    const { data: tasks, loading, refetch } = useQuery('tasks', () =>
        fetch("https://simple-todo-server-database.herokuapp.com/tasks")
            .then(res => res.json())
    )

    const handleSubmit = e => {
        e.preventDefault();
        const taskName = e.target.name.value;
        const description = e.target.description.value;
        const newTask = { taskName, description };
        const url = 'https://simple-todo-server-database.herokuapp.com/tasks';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Task added');
                refetch();
            })
        e.target.reset();
        setAddTask(false);     
    }

    const taskComplete = id => {

        const state = { taskState: true };
        const url = `https://simple-todo-server-database.herokuapp.com/tasks/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .then(res => res.json)
            .then(data => {
                toast.success("Task completed");
                refetch();
            })
    }

    const handleDelete = id => {

        const url = `https://simple-todo-server-database.herokuapp.com/tasks/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                toast("Task Deleted");
                refetch();
            })
    }

    const handleSignOut = () => {
        signOut(auth);

    }

    return (
        <div className='md:mx-24 mx-8 border bg-white'>
            <h1 className='text-center text-4xl font-bold my-16 uppercase text-slate-700'>Simple To-Do List</h1>
            <div className='text-center w-1/2 mx-auto'>
                {
                    addTask ?
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <h1 className='text-xl mb-4 font-semibold text-slate-800'>Add New Task</h1>
                            <input name='name' type="text" placeholder="Enter task name" className='border py-2 rounded-lg px-2 mb-4' required />
                            <textarea name='description' placeholder="Task description" className='border py-2 rounded-lg px-2 mb-4' required />
                            <button type='submit' className='bg-blue-600 px-2 py-4 text-white rounded font-semibold text-lg'>Add Task</button>
                        </form>
                        :
                        <button onClick={() => setAddTask(true)} className='text-blue-800 px-2 py-4 rounded font-semibold flex border-2 border-blue-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add new task</button>
                }
            </div>
            <div className='mt-12 space-y-4'>
                {
                    loading ?
                        <Spinner></Spinner>
                        :
                        tasks?.map(task => <div key={task._id} className='border w-1/2 mx-auto rounded-lg flex items-center justify-between p-6' >
                            <div className='flex items-center'>
                                <button className={`${task.state ? 'bg-red-600' : 'bg-green-600'} px-2 py-1 text-white rounded`} disabled={task.state} onClick={() => taskComplete(task._id)}><small>Completed</small></button>
                                <div className={`ml-4 ${task.state ? 'line-through' : ''}`}>
                                    <label className='text-xl font-semibold'>{task.taskName}</label>
                                    <p>{task.description}</p>
                                </div>
                            </div>
                            <button className='' onClick={() => handleDelete(task._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>)
                }
            </div>
            <button onClick={handleSignOut} className='text-blue-800 px-2 py-4 rounded font-semibold flex border-2 border-blue-800 mb-36 mx-auto mt-12'>
                SignOut</button>
        </div>
    );
};

export default Homepage;