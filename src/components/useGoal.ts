import { useEffect, useState } from 'react';
import DashboardWidget from '../DashboardWidget';
import { getMonthAgoDate } from './utils';

type UseGoal = {
  type: 'loading'
} | {
  type: 'error'
} | {
  type: 'data';
  data: {
    all: number;
    resolved: number;
    addedAtLastTime: number;
    resolvedAtLastTime: number;
  };
};

type GoalsTags = 'FE Goal TS' | 'FE Goal uiKit' | 'FE Goal Site load' | 'FE Goal SSR';

export const useGoal = (tag: GoalsTags):UseGoal => {
  const [value, setValue] = useState<UseGoal>({ type: 'loading' });

  useEffect(() => {
    const getDevTasks = async () => {
      const monthAgoDate = getMonthAgoDate(new Date());
      const queryAll = `Team: Frontend Type: {Dev Task} Tag: {${tag}}`;
      const queryResolvedAll = `Team: Frontend Type: {Dev Task} State: {Finished}, {Verified}, {Canceled} Tag: {${tag}}`;
      const queryCreatedLastMonth = `${queryAll} created: ${monthAgoDate} .. *`;
      const queryResolvedLastMonth = `${queryResolvedAll} resolved date: ${monthAgoDate} .. *`;

      try {
        const all = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${encodeURI(queryAll)}`);
        const resolved = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${encodeURI(queryResolvedAll)}`);
        const createdByLastMonth = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${encodeURI(queryCreatedLastMonth)}`);
        const resolvedByLastMonth = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${encodeURI(queryResolvedLastMonth)}`);

        setValue({
          type: 'data',
          data: {
            all: all.length,
            resolved: resolved.length,
            addedAtLastTime: createdByLastMonth.length,
            resolvedAtLastTime: resolvedByLastMonth.length,
          },
        });
      } catch (e) {
        setValue({ type: 'error' });
      }
    };
    getDevTasks();
  }, []);

  return value;
};
