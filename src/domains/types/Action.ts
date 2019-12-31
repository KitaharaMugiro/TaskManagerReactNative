export type Action = {
  actionId: string;
  title: string;
};

export type SelectableAction = {
  actionId: string;
  title: string;
  selected: boolean;
};

export type ActionGoal = {
  count: number;
};

export type ActionProgress = {
  count: number;
  lastDone: Date;
};
