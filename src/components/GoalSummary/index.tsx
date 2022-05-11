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
      <p>Всего:</p>
      <div className="goal__progress">
        <div className="goal__progress_success-line" style={{ width: `${(resolved * 100) / all}%` }} />
        <div className="goal__progress_info">{`Выполнено ${resolved} из ${all}`}</div>
      </div>
      <p>
        Добавлено за последний месяц:&nbsp;
        {addedAtLastTime}
      </p>
      <p>
        Выполнено за последний месяц:&nbsp;
        {resolvedAtLastTime}
      </p>
    </>
  ));
