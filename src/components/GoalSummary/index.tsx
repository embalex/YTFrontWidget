import React from 'react';
import './GoalSummary.css';

interface Props {
  all: number;
  resolved: number;
  addedAtLastTime: number;
  resolvedAtLastTime: number;
}

export const GoalSummary: React.FC<Props> = ({
  all, resolved, resolvedAtLastTime, addedAtLastTime,
}) => (all === 0
  ? <p className="goal__progress_warning">К сожалению, задач в этой категории нет</p>
  : (
    <>
      <p>
        {`За последний месяц добавлено ${addedAtLastTime}, выполнено ${resolvedAtLastTime}.`}
      </p>
      <p>{`Всего выполнено: ${resolved} из ${all}`}</p>
      <div className="goal__progress">
        <div className="goal__progress_success-line" style={{ width: `${(resolved * 100) / all}%` }} />
      </div>
    </>
  ));
