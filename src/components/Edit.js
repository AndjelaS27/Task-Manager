import { useState } from 'react';
import { useEditTaskMutation } from './rtk'

function Edit({ task, onClose }) {
    const currentTime = new Date().toISOString().slice(11, 16);
    const [inputValue, setInputValue] = useState(task.taskName);
    const [startTime, setStartTime] = useState(task.startTime || currentTime);
    const [endTime, setEndTime] = useState(task.endTime || currentTime);
    const [taskType, setTaskType] = useState(task.taskType || 'education');

    const [editTask] = useEditTaskMutation()

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const editedTask = {
            ...task,
            taskName: inputValue, 
            startTime, 
            endTime, 
            taskType
        }
        await editTask(editedTask);
        onClose();
    };

    const handleRadioChange = (event) => {
        setTaskType(event.target.value);
    };

    return (
        <div className='w-full flex flex-col items-end justify-center'>
            <form onSubmit={handleSubmit}>
                <div className='bg-transparent flex m-3'>
                    <input onChange={handleChange} value={inputValue} className='text-white text-l border-2 border-slate-600 focus-border h-11 w-[30vw] bg-transparent'></input>
                    <div className='bg-slate-600 h-11 w-28 text-center pt-2'>
                        <button className='text-white cursor-pointer'>Update Task</button>
                    </div>
                </div>
                <div className='flex justify-between my-6'>
                    <label className='text-white'>From:
                        <input 
                            type='time' 
                            value={startTime} 
                            onChange={(e) => setStartTime(e.target.value)} 
                            className='ml-2 p-1 rounded-lg bg-transparent text-white border-2'
                        />
                    </label>
                    <label className='text-white'>Until:
                        <input 
                            type='time' 
                            value={endTime} 
                            onChange={(e) => setEndTime(e.target.value)} 
                            className='ml-2 p-1 rounded-lg bg-transparent text-white border-2'
                        />
                    </label>
                </div>
                <div className='flex justify-between my-6'>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Education</label>
                        <input type='radio' onChange={handleRadioChange} name='taskType' value='education' checked={taskType === 'education'} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Fun</label>
                        <input type='radio' onChange={handleRadioChange} name='taskType' value='fun' checked={taskType === 'fun'} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Health</label>
                        <input type='radio' onChange={handleRadioChange} name='taskType' value='health' checked={taskType === 'health'} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Other</label>
                        <input type='radio' onChange={handleRadioChange} name='taskType' value='other' checked={taskType === 'other'} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;
