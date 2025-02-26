function Dashboard ({daysBorder, isSelected, setIsSelected}) {

    const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleClick = (day) => {
        setIsSelected(day)
    }

    const renderedDays = daysList.map((day, index) => {
        const bgColor = day === isSelected ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-[#383838]'
        const findDay = daysBorder.find((x) => day.slice(0, 3) === x)
        const borderColor = findDay ? {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 15px rgba(200, 200, 200, 0.4), 0 1px 10px rgba(200, 200, 200, 0.6)'
        } : {}
        return (
            <div onClick={() => handleClick(day)}
                key={index} 
                className={`w-[80%] h-[10vh] rounded-3xl flex items-center justify-center text-white ${bgColor}`}
                style={borderColor}
            >
                <p>{day}</p>
            </div>
        )
    })

    return (
        <div className='w-[20%] h-[95vh] bg-[#282727] self-center ml-5 rounded-3xl flex flex-col items-center justify-center gap-5'>
            {renderedDays}
        </div>
    )
}

export default Dashboard;