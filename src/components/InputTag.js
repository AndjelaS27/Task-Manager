import { useState } from 'react';
import Days from './Days';
import { MdAdd } from 'react-icons/md';
import { useAddTaskMutation } from './rtk'

function InputTag ({handleDaysBorder, taskListLength}) {
    const currentTime = new Date().toISOString().slice(11, 16);
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(undefined);
    const [clickedDays, setClickedDays] = useState([]);
    const [startTime, setStartTime] = useState(currentTime);
    const [endTime, setEndTime] = useState(currentTime);
    const [taskType, setTaskType] = useState('education');

    const [addTask] = useAddTaskMutation()
    const handleSelectDay = (day) => {
        const isSelectedDay = clickedDays.find((x) => x === day);
        const newList = [...clickedDays];
        if (isSelectedDay) {
            const deletedList = newList.filter((x) => x !== day);
            setClickedDays(deletedList);
        } else {
            setClickedDays([...newList, day]);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(clickedDays.length < 1 || inputValue.length < 1 || !startTime || !endTime) {
            setIsValid(false);
        } else {
            const newTask = {
                taskName: inputValue,
                days: clickedDays,
                startTime,
                endTime,
                orderNumber: taskListLength + 1,
                taskType
            };
            addTask(newTask);
            
            setInputValue('');
            setStartTime(currentTime);
            setEndTime(currentTime);
            handleDaysBorder(clickedDays);
            setClickedDays([]);
            setIsValid(true);
        }
    };

    const handleRadioChange = (e) => {
        setTaskType(e)
    }

    return (
        <div className='mb-11'>
            <h1 className='text-white mb-5 text-3xl font-bold text-center'>Get Things Done!</h1>
            <form onSubmit={handleSubmit}>
                <div className='bg-transparent flex border-2 rounded-full justify-between'>
                    <input 
                        value={inputValue} 
                        onChange={handleChange} 
                        placeholder='What is the task today?' 
                        className='text-white text-l pl-3 h-11 w-96 bg-transparent rounded-full'
                    />
                    <div onClick={handleSubmit} className='h-11 w-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 items-center flex justify-center'>
                        <MdAdd color='white' size={30}/>
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
                        <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' value='education' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Fun</label>
                        <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' value='fun' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Health</label>
                        <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' value='health' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-white'>Other</label>
                        <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' value='other' />
                    </div>
                </div>

            </form>
            <Days clickedDays={clickedDays} handleSelect={handleSelectDay}/>
            {isValid === true && (
                <p className='text-white bg-green-500 text-center py-3 rounded-xl mt-10 text-xl'>Task created successfully!</p>
            )}
            {isValid === false && (
                <p className='text-white bg-red-500 text-center py-3 rounded-xl mt-10 text-xl'>Task name, day, and time are required!</p>
            )}
        </div>
    );
}

export default InputTag;
