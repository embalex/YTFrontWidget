import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import DashboardWidget from './DashboardWidget';
import { Goal } from './components/Goal';
import './App.css';

const goals = [{
  caption: 'Подключение к typescript',
  tag: 'FE Goal TS' as const,
}, {
  caption: 'uiKit',
  tag: 'FE Goal uiKit' as const,
}, {
  caption: 'Скорость загрузки сайта',
  tag: 'FE Goal Site load' as const,
}, {
  caption: 'Node и нормальный SSR',
  tag: 'FE Goal SSR' as const,
}];

const App:React.FC = () => {
  const [isAppInInitProcess, setIsAppInInitProcess] = useState(true);

  useEffect(() => {
    DashboardWidget.init().then(() => {
      setIsAppInInitProcess(false);
    });
  }, []);

  return (
    <div>
      {isAppInInitProcess
        ? <div>Loading...</div>
        : goals.map((goal) => <Goal className="goal" key={goal.tag} {...goal} />)}
    </div>
  );
};

const element = document.getElementById('app');
if (element === null) {
  throw new Error('Root element is empty');
}
const root = ReactDOM.createRoot(element);
root.render(<App />);
