export class ProgressEntity {
  public static schema: Realm.ObjectSchema = {
    name: 'Progress',
    primaryKey: 'actionId',
    properties: {
      actionId: 'string',
      count: 'int',
      lastDate: 'date',
    },
  };

  public actionId: string;
  public count: number;
  public lastDate: Date;

  constructor(actionId: string, count: number, lastDate: Date) {
    this.actionId = actionId;
    this.count = count;
    this.lastDate = lastDate;
  }
}
