import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import DashboardWidget from './DashboardWidget';
import { TSGoal } from './Goals/TS';
import { UiKitGoal } from './Goals/UiKit';
import './App.css';

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
        : (
          <>
            <TSGoal />
            <UiKitGoal />
          </>
        )}
    </div>
  );
};

const element = document.getElementById('app');
if (element === null) {
  throw new Error('Root element is empty');
}
const root = ReactDOM.createRoot(element);
root.render(<App />);
