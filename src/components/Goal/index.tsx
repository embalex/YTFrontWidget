import React from 'react';
import { useGoal } from '../useGoal';
import { GoalSummary } from '../GoalSummary';
import { GoalTag } from '../../constants';

interface Props {
  className?: string;
  tag: GoalTag;
  caption: string;
}

export const Goal: React.FC<Props> = ({ tag, caption, className = '' }) => {
  const tasks = useGoal(tag);

  return (
    <div className={className}>
      <h2>{caption}</h2>
      {tasks.type === 'loading' && <p className="goal__error">Ищем таски, делим на ноль, ... тут что-то не культурное про гусей</p>}
      {tasks.type === 'error' && <p className="goal__error">Что-то пошло не так. Напишите в спортлото )</p>}
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
