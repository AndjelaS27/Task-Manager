import Task from './Task';
import { useRef, useState, useEffect } from 'react';
import { useEditTaskMutation } from './rtk';

function TaskList({ dayTasks, onDelete, onEdit, isSelected }) {
  const [todaysTasks, setTodaysTasks] = useState(dayTasks);
  const [selectedType, setSelectedType] = useState('all');
  const dragTask = useRef(0);
  const dragOverTask = useRef(0);
  const [editTask] = useEditTaskMutation();

  useEffect(() => {
    setTodaysTasks(dayTasks);
  }, [dayTasks]);

  const handleSort = async () => {
    const reorderedTasks = [...todaysTasks];
    const dragTaskOrder = reorderedTasks[dragTask.current].orderNumber;
    reorderedTasks[dragTask.current].orderNumber = reorderedTasks[dragOverTask.current].orderNumber;
    reorderedTasks[dragOverTask.current].orderNumber = dragTaskOrder;

    for (const task of reorderedTasks) {
      await editTask({ id: task.id, ...task }).unwrap();
    }
    setTodaysTasks(reorderedTasks.sort((a, b) => a.orderNumber - b.orderNumber));
  };

  const renderedTasks = todaysTasks
    .filter((task) => selectedType === 'all' || task.taskType === selectedType)
    .map((task, index) => (
      <div
        key={task.id}
        draggable
        onDragStart={() => (dragTask.current = index)}
        onDragEnter={() => (dragOverTask.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
      >
        <Task onEdit={onEdit} onDelete={onDelete} task={task} isSelected={isSelected} />
      </div>
    ));

  return (
    <div className='w-full h-[90%] flex flex-col justify-between'>
      <div className='self-center w-[90%] h-[80%] mt-10 overflow-auto scrollbar'>
        <div className='flex justify-between items-center'>
          {['all', 'education', 'fun', 'health', 'other'].map((type) => (
            <p
              key={type}
              onClick={() => setSelectedType(type)}
              className={`w-[7.5vw] text-center rounded-lg mb-5 cursor-pointer text-white ${
                selectedType === type ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-500'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ))}
        </div>
        {renderedTasks}
      </div>
    </div>
  );
}

export default TaskList;
