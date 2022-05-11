import React from 'react';
import { useGoal } from '../useGoal';
import { GoalSummary } from '../GoalSummary';

interface Props {
  className?: string;
  tag: Parameters<typeof useGoal>[0];
  caption: string;
}

export const Goal: React.FC<Props> = ({ tag, caption, className = '' }) => {
  const tasks = useGoal(tag);

  return (
    <div className={className}>
      <h2>{caption}</h2>
      {tasks.type === 'data' && <GoalSummary {...tasks.data} />}
    </div>
  );
};
