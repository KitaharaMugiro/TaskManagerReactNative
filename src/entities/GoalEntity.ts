export class GoalEntity {
  public static schema: Realm.ObjectSchema = {
    name: 'Goal',
    primaryKey: 'actionId',
    properties: {
      actionId: 'string',
      goalCount: 'int',
    },
  };

  public actionId: string;
  public goalCount: number;

  constructor(actionId: string, goalCount: number = 5) {
    this.actionId = actionId;
    this.goalCount = goalCount;
  }
}
