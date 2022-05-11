import React from 'react';
import { useGoal } from '../components/useGoal';
import { GoalSummary } from '../components/GoalSummary';

export const SiteSpeedGoal: React.FC = () => {
  const tasks = useGoal('FE Goal Site load');

  return (
    <div>
      <h2>Оптимизация скорости загрузки сайта</h2>
      <p>
          Сейчас все очень долго (время до полной загрузки около 11 секунд).
      </p>
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
