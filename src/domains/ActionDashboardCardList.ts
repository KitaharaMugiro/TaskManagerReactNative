import {ActionDashboardCard} from './ActionDashboardCard';
export class ActionDashboardCardList {
  isEmpty() {
    return this.actions.length === 0;
  }
  actions: ActionDashboardCard[];
  constructor(actions: ActionDashboardCard[]) {
    this.actions = actions;
  }
}
