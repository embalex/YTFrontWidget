import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import DashboardWidget from './DashboardWidget';
import { Goal } from './components/Goal';
import { GoalTag } from './constants';
import './App.css';

const goals = [{
  caption: 'Подключение к typescript',
  tag: GoalTag.TS,
}, {
  caption: 'uiKit',
  tag: GoalTag.UiKit,
}, {
  caption: 'Скорость загрузки сайта',
  tag: GoalTag.SiteLoad,
}, {
  caption: 'Node и нормальный SSR',
  tag: GoalTag.SSR,
}];

const App:React.FC = () => {
  const [isAppInInitProcess, setIsAppInInitProcess] = useState(true);

  useEffect(() => {
    DashboardWidget.init().then(() => {
      setIsAppInInitProcess(false);
    });
  }, []);

  if (isAppInInitProcess) {
    return <div>Loading...</div>;
  }

  if (!DashboardWidget.isUserCanUseTags) {
    return <img src="minion.svg" alt="Menion" className="menion" />;
  }

  return (
    <div>
      {goals.map((goal) => <Goal className="goal" key={goal.tag} {...goal} />)}
    </div>
  );
};

const element = document.getElementById('app');
if (element === null) {
  throw new Error('Root element is empty');
}
const root = ReactDOM.createRoot(element);
root.render(<App />);
