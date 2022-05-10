import React from 'react';
import { useTSGoal } from './useTSGoal';
import './TSGoal.css';

export const TSGoal: React.FC = () => {
  const tasks = useTSGoal();

  return (
    <div>
      <h2 className="ts-goal__header">Подключение к typescript</h2>
      <p className="ts-goal__description">Проект должен быть подключен полностью, без исключений</p>

      {tasks.type === 'data' && (
      <div className="ts-goal__progress">
        <div className="ts-goal__progress_success-line" style={{ width: `${tasks.data.all ? (tasks.data.resolved * 100) / tasks.data.all : 100}%` }} />
        <div className="ts-goal__progress_info">{`Выполнено ${tasks.data.resolved} : ${tasks.data.all}`}</div>
      </div>
      )}
    </div>
  );
};
