import { useEffect, useState } from 'react';
import DashboardWidget from '../DashboardWidget';

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
      const queryAll = encodeURI(`Team: Frontend Type: {Dev Task} Tag: {${tag}}`);
      const queryResolved = encodeURI(`Team: Frontend Type: {Dev Task} State: {Finished}, {Verified}, {Canceled} Tag: {${tag}}`);

      try {
        const allDevTasks = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${queryAll}`);
        const resolvedDevTasks = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${queryResolved}`);

        setValue({
          type: 'data',
          data: {
            all: allDevTasks.length,
            resolved: resolvedDevTasks.length,
            addedAtLastTime: 0,
            resolvedAtLastTime: 0,
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
