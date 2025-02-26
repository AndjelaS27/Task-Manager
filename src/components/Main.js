import InputTag from './InputTag';
import React, { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import { MdAdd } from 'react-icons/md';
import DashbordWidgetView from './DashbordWidgetView';
import { useAddTaskMutation, useDeleteTaskMutation, useEditTaskMutation, useGetTasksQuery } from './rtk'
import { useSelector, useDispatch } from 'react-redux';


function Main ({handleDaysBorder, isSelected}) {
    const [contentType, setContentType] = useState('list')
    const [contentToShow, setContentToShow] = useState(null);
    const [shoudShowAddTask, setShoudShowAddTask] = useState(null)
    const bodyStyleRef = useRef(document.body.style)

    useGetTasksQuery()
    const [editTask] = useEditTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()
    const [addTask] = useAddTaskMutation()

    const { taskList } = useSelector((state) => state.tasks)

    const dayTasks = taskList.filter((task) => {
        const isForToday = task.days.find((x) => x === isSelected.slice(0, 3))
        return isForToday
        
    })

    const handleEdit = async (id, newText, startTime, endTime, taskType) => {
        const taskToEdit = taskList.find((task) => task.id === id)
        if (!taskToEdit) return

        const editedTask = {
            ...taskToEdit, 
            taskName: newText,
            startTime,
            endTime,
            taskType
        }
        editTask(editedTask)
        
    }

    const onDelete = (deletedTask) => {
        deleteTask(deletedTask)
    }

    const handleAddTask = (newTask) => {
        addTask(newTask)
    }

    useEffect(() => {
        if (contentType === 'dashbord') {
            setContentToShow(<DashbordWidgetView isSelected={isSelected} todaysTasks={dayTasks} taskList={taskList}/>)
            return
        }
        const areTasksPresent = dayTasks.length > 0
        const content = areTasksPresent ? <TaskList isSelected={isSelected}  onEdit={handleEdit} onDelete={onDelete} dayTasks={dayTasks}/> : <InputTag taskListLength={taskList.length} handleAddTask={handleAddTask} handleDaysBorder={handleDaysBorder}/>
        setContentToShow(content)
        setShoudShowAddTask(areTasksPresent)
    }, [taskList, isSelected, contentType])
    
    const handleShowContent = () => {
        setContentToShow(<InputTag taskListLength={taskList.length} handleAddTask={handleAddTask} handleDaysBorder={handleDaysBorder}/>)
        setShoudShowAddTask(false)
    }

    const handleSetContent = (contentType) => {
        setContentType(contentType)
        setContentToShow(<DashbordWidgetView isSelected={isSelected} todaysTasks={dayTasks} taskList={taskList}/>)
        if (contentType === 'dashbord') {
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = '#181818';
        } else {
            document.body.style = bodyStyleRef.current
        }
        
    }

    return (
        <div className='w-[100%] h-[100vh]'>
            <div className='flex flex-row items-center justify-center w-[100%] gap-20'>
                <p onClick={() => handleSetContent('list')} className={`w-[10vw] text-center rounded-2xl mt-10 p-3 cursor-pointer text-white ${contentType === 'list' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-500'}`}>List View</p>
                <p onClick={() => handleSetContent('dashbord')} className={`w-[10vw] text-center rounded-2xl mt-10 p-3 cursor-pointer text-white ${contentType === 'dashbord' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-500'}`}>Dashbord View</p>
            </div>
            <div className='justify-items-center mt-10'>
                <div className='flex flex-col items-center justify-center drop-shadow-xl w-[90vh] h-[70vh] rounded-3xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-3xl'>
                    {contentToShow}
                    {shoudShowAddTask && contentType === 'list' && (
                        <div onClick={handleShowContent} className='w-[25%] cursor-pointer self-end justify-center flex items-center border-2 border-cyan-500 rounded-full mb-5 mr-5'>
                            <p className='text-center w-[100%] text-lg text-white'>Add task</p>
                            <div className='h-11 w-11 self-end rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 items-center flex'>
                                <MdAdd color='white' size={30}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main;