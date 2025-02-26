import { FaEdit, FaCheckSquare, FaBook } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState, useEffect } from 'react';
import Edit from './Edit';
import { BiSolidJoystick } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useEditTaskMutation, useDeleteTaskMutation } from "./rtk";

function Task({ task, isSelected }) {
    const [showEdit, setShowEdit] = useState(false);
    const [checkColor, setCheckColor] = useState(false);

    const [editTask] = useEditTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const icons = {
        education: <FaBook size={20} color='white' />, 
        fun: <BiSolidJoystick size={20} color='white' />, 
        health: <CgGym size={20} color='white' />, 
        other: <HiOutlineDotsCircleHorizontal size={20} color='white' />
    };

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleClick = async () => {
        const isChecked = !checkColor;
        setCheckColor(isChecked);
        const dayKey = isSelected.slice(0, 3);
        
        try {
            await editTask({
                ...task,
                isFinished: { ...task.isFinished, [dayKey]: isChecked }
            }).unwrap();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const taskToUpdate = { ...task };
            taskToUpdate.days = taskToUpdate.days.filter(day => day !== isSelected.slice(0, 3));
    
            if (taskToUpdate.days.length === 0) {
                await deleteTask(task.id).unwrap();  
            } else {
                await editTask(taskToUpdate).unwrap();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    

    useEffect(() => {
        const shortDayKey = isSelected.slice(0, 3);
        const isTaskFinished = task.isFinished ? task.isFinished[shortDayKey] ?? false : false;
        setCheckColor(isTaskFinished);
    }, [isSelected, task]);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center gap-3 mb-5'>
                <div className='flex bg-slate-600 rounded-full p-3'>
                    {icons[task.taskType] || icons['other']}
                </div>
                <div className='bg-slate-600 w-full py-3 rounded h-20 flex flex-col justify-between'>
                    <div className='flex justify-between text-xl items-center'>
                        <p className='text-white ml-3'>{task.taskName}</p>
                        <div className='flex gap-1 mr-3'>
                            <FaEdit className='cursor-pointer' onClick={handleShowEdit} color='white' size={20} />
                            <MdDelete className='cursor-pointer' onClick={handleDelete} color='white' size={20} />
                            <FaCheckSquare onClick={handleClick} className={`cursor-pointer ${checkColor ? 'text-green-600' : 'text-white'}`} size={20} />
                        </div>
                    </div>
                    <p className='ml-3 text-white'>{task.startTime} - {task.endTime}</p>
                </div>
            </div>
            {showEdit && <Edit task={task} onClose={handleShowEdit} />}
        </div>
    );
}

export default Task;
