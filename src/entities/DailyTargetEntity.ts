export class DailyTargetEntity {
  public static schema: Realm.ObjectSchema = {
    name: 'DailyTarget',
    properties: {
      actionId: 'string',
      date: 'date',
    },
  };

  public actionId: string;
  public date: Date;

  constructor(actionId: string, date: Date) {
    this.actionId = actionId;
    this.date = date;
  }
}
