import React from 'react';
import { useGoal } from '../components/useGoal';
import { GoalSummary } from '../components/GoalSummary';

export const TSGoal: React.FC = () => {
  const tasks = useGoal('FE Goal TS');

  return (
    <div>
      <h2>Подключение к typescript</h2>
      <p>Проект должен быть подключен полностью, без исключений</p>
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
