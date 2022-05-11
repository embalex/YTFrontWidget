import React from 'react';
import { useGoal } from '../components/useGoal';
import { GoalSummary } from '../components/GoalSummary';

export const NodeSSRGoal: React.FC = () => {
  const tasks = useGoal('FE Goal uiKit');

  return (
    <div>
      <h2>Переход на node и нормальный SSR</h2>
      <p>
        Сейчас это сложная штука с php и фронтам надо знать как php, так и JS. Кроме того,
        SSR сейчас самодельный (по сути кучка SPA).
      </p>
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
