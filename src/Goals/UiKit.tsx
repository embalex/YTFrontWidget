import React from 'react';
import { useGoal } from '../components/useGoal';
import { GoalSummary } from '../components/GoalSummary';

export const UiKitGoal: React.FC = () => {
  const tasks = useGoal('FE Goal uiKit');

  return (
    <div>
      <h2>Вынос uiKit</h2>
      <p>
        Над многими компонентами надо поработать и поправить юзабилити.
        Много компонентов не согласованных. Так же надо в проекте сделать так,
        чтоб все компоненты были из uiKt. Сам кит должен быть в
        отдельном репозитории и с отдельными деплоями
      </p>
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
