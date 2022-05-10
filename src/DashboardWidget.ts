import Dashboard from 'hub-dashboard-addons';

type Fetch = <T>(...parameters: Parameters<typeof fetch>) => Promise<T> | never;

class DashboardWidget {
  private widgetApi: DashboardApi | null = null;

  private widgetFetch: Fetch | null = null;

  init = (): Promise<void> => (
    Dashboard.registerWidget(async (dashboardApi, registerWidgetApi) => {
      dashboardApi.setTitle('Frontend global status');
      registerWidgetApi({
        onRefresh: () => {},
      });

      this.widgetApi = dashboardApi;
      const ytServices = await dashboardApi.loadServices('YouTrack');
      if (ytServices.length !== 1) {
        throw new Error(`DashboardWidget.constructor. ytServices.length ns wrong: ${JSON.stringify(ytServices)}`);
      }
      const ytServiceId = ytServices[0].id;
      this.widgetFetch = (...params) => dashboardApi.fetch(ytServiceId, ...params);
    }));

  get api(): DashboardApi {
    if (this.widgetApi === null) {
      throw new Error('DashboardWidget.api is not defined');
    }

    return this.widgetApi;
  }

  get fetch(): Fetch {
    if (this.widgetFetch === null) {
      throw new Error('DashboardWidget.fetch is not defined');
    }

    return this.widgetFetch;
  }
}

export default new DashboardWidget();
