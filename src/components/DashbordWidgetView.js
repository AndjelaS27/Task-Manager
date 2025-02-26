import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const DashbordWidgetView = ({todaysTasks, taskList, isSelected}) => {
  const [slide, setSlide] = useState(0);
  const [dataForCalculation, setDataForCalculation] = useState(todaysTasks)
  const [period, setPeriod] = useState('day');

  const handleSlide = (direction) => {
    setSlide((prevSlide) => (direction === 'next' ? prevSlide + 1 : Math.max(prevSlide - 1, 0)));
  };

  const chartData = {}
  dataForCalculation.forEach((task) => {
    const finishedCount = task.isFinished ? Object.keys(task.isFinished).length : 0;

    if (chartData.hasOwnProperty(task.taskType)) {
        chartData[task.taskType] = { 
            ...chartData[task.taskType], 
            count: chartData[task.taskType].count + 1,
            isFinishedCount: chartData[task.taskType].isFinishedCount + finishedCount 
        };
    } else {
        chartData[task.taskType] = { 
            count: 1, 
            isFinishedCount: finishedCount 
        };
    }
  });

  useEffect(() => {
    if (period === 'week') {
      setDataForCalculation(taskList)
    } else {
      setDataForCalculation(todaysTasks)
    }
  }, [todaysTasks, period, taskList, isSelected])

  const pieData = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Proportion of tasks',
        data: Object.values(chartData).map(item => item.count),
        backgroundColor: ['#de5585', '#5ce1e6', '#ffbd59', '#cb6ce6'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
  };

  const lineData = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Completed Tasks',
        data: Object.values(chartData).map(item => item.isFinishedCount),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: period === 'day' ? todaysTasks.length : taskList.length,
      },
    },
  };

  const handleRadioChange = (e) => {
    setPeriod(e)
}

  return (
    <div className='relative flex flex-col items-center justify-center h-full w-full p-10'>
      <div className='absolute top-5 right-5'>
        <div className='flex items-center justify-end gap-2'>
          <label className='text-white'>Day</label>
          <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' checked={period === 'day'} value='day' />
        </div>
        <div className='flex items-center justify-end gap-2'>
          <label className='text-white'>Week</label>
          <input type='radio' onChange={(e) => handleRadioChange(e.target.value)} name='taskType' checked={period === 'week'} value='week' />
        </div>
      </div>
      <div className='w-full h-full flex items-center justify-center'>
        {slide % 2 === 0 ? <Pie data={pieData} options={pieOptions} /> : <Line data={lineData} options={lineOptions} />}
      </div>

      <div className='absolute top-1/2 flex w-full justify-between items-center'>
        <IoIosArrowBack
          color='white'
          size={40}
          className='cursor-pointer'
          onClick={() => handleSlide('prev')}
        />
        <IoIosArrowForward
          color='white'
          size={40}
          className='cursor-pointer'
          onClick={() => handleSlide('next')}
        />
      </div>
    </div>
  );
};

export default DashbordWidgetView;
