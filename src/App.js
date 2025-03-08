import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './components/store';

function App() {
  const [daysBorder, setDaysBorder] = useState([]);
  const today = new Date().toLocaleDateString('en', { weekday: 'long' });
  const [isSelected, setIsSelected] = useState(today);

  const handleDaysBorder = (days) => {
    setDaysBorder(days)
  }

  return (
    <Provider store={store}>
      <div className='flex flex-col md:flex-row'>
        <Dashboard isSelected={isSelected} setIsSelected={setIsSelected} daysBorder={daysBorder}/>
        <Main isSelected={isSelected} handleDaysBorder={handleDaysBorder}/>
      </div>
    </Provider>
    
  );
}

export default App;
