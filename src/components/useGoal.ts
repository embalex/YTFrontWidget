import { useEffect, useState } from 'react';
import DashboardWidget from '../DashboardWidget';
import { getMonthAgoDate } from './utils';
import { GoalTag } from '../constants';

const RELOAD_INTERVAL_MS = 5 * 60 * 1000;

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

export const useGoal = (tag: GoalTag):UseGoal => {
  const [value, setValue] = useState<UseGoal>({ type: 'loading' });

  useEffect(() => {
    let timer: number | null = null;
    const getDevTasks = async () => {
      const monthAgoDate = getMonthAgoDate(new Date());
      const queryAll = `Team: Frontend Tag: {${tag}}`;
      const queryResolvedAll = `Team: Frontend State: {Finished}, {Verified}, {Canceled} Tag: {${tag}}`;
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
    timer = window.setInterval(getDevTasks, RELOAD_INTERVAL_MS);

    return () => {
      if (timer === null) {
        return;
      }

      window.clearInterval(timer);
    };
  }, []);

  return value;
};
