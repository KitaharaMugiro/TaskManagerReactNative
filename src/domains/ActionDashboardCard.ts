import {Action, ActionGoal, ActionProgress} from './types/Action';

export class ActionDashboardCard {
  getFirstDone(): string {
    if (this.progress.firstDone) {
      return String(this.progress.firstDone);
    } else {
      return '未達成';
    }
  }
  getProgressCountString(): string {
    return String(this.progress.count);
  }
  setGoal(number: number): ActionDashboardCard {
    this.goal.count = number;
    return new ActionDashboardCard(this.action, this.goal, this.progress);
  }
  setTitle(text: string): ActionDashboardCard {
    this.action.title = text;
    return new ActionDashboardCard(this.action, this.goal, this.progress);
  }
  getGoalCountString(): string {
    return String(this.goal.count);
  }
  action: Action;
  goal: ActionGoal;
  progress: ActionProgress;

  constructor(action: Action, goal: ActionGoal, progress: ActionProgress) {
    this.action = action;
    this.goal = goal;
    this.progress = progress;
  }

  getProgressRate() {
    return this.progress.count / this.goal.count;
  }

  private getSuccessiveDays() {
    if (!this.progress.firstDone) {
      return 0;
    }
    const diffTime = new Date().getTime() - this.progress.firstDone.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return Math.round(diffDays) + 1;
  }

  displaySuccessiveDays(): string {
    const days = this.getSuccessiveDays();
    return `${days}日連続達成中!`;
  }

  getId() {
    return this.action.actionId;
  }
}
