import { useEffect, useState } from 'react';
import DashboardWidget from '../DashboardWidget';

type UseTSGoal = {
  type: 'loading'
} | {
  type: 'error'
} | {
  type: 'data';
  data: {
    all: number;
    resolved: number;
  };
};

export const useTSGoal = ():UseTSGoal => {
  const [value, setValue] = useState<UseTSGoal>({ type: 'loading' });

  useEffect(() => {
    const getDevTasks = async () => {
      const queryAll = encodeURI('Team: Frontend Type: {Dev Task} ');
      const queryResolved = encodeURI('Team: Frontend Type: {Dev Task} State: {Finished}, {Verified}, {Canceled}');

      try {
        const allDevTasks = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${queryAll}`);
        const resolvedDevTasks = await DashboardWidget.fetch<unknown[]>(`api/issues?fields=id&query=${queryResolved}`);

        setValue({
          type: 'data',
          data: {
            all: allDevTasks.length,
            resolved: resolvedDevTasks.length,
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
