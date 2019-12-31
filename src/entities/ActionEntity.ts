export class ActionEntity {
  public static schema: Realm.ObjectSchema = {
    name: 'Action',
    primaryKey: 'actionId',
    properties: {
      title: 'string',
      actionId: 'string',
    },
  };

  public title: string;
  public actionId: string;

  constructor(title: string, actionId: string) {
    this.title = title;
    this.actionId = actionId;
  }
}
