function Days ({handleSelect, clickedDays}) {

    const daysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const renderedDays = daysList.map((day, index) => {
        const findCurrentDay = clickedDays.find((x) => x === day)
        const bgColor = findCurrentDay ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-500'
       return <p onClick={() => handleSelect(day)} key={index} className={`${bgColor} rounded px-3 cursor-pointer`}>{day}</p>
    })
    return(
        <div className='flex text-white uppercase gap-3 w-full justify-between mt-3'>
            {renderedDays}
        </div>
    )
}

export default Days;