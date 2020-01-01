export class ProgressEntity {
  public static schema: Realm.ObjectSchema = {
    name: 'Progress',
    primaryKey: 'actionId',
    properties: {
      actionId: 'string',
      count: 'int',
      lastDate: 'date',
      firstDone: {type: 'date', optional: true},
    },
  };

  public actionId: string;
  public count: number;
  public lastDate: Date;
  public firstDone?: Date;

  constructor(
    actionId: string,
    count: number,
    lastDate: Date,
    firstDone?: Date,
  ) {
    this.actionId = actionId;
    this.count = count;
    this.lastDate = lastDate;
    this.firstDone = firstDone;
  }
}
