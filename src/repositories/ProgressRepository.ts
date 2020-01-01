import {ActionProgress} from './../domains/types/Action';
import {ProgressEntity} from './../entities/ProgressEntity';
import {RealmHandler} from '../libs/RealmHandler';
export class ProgressRepository {
  async incrementProgress(actionId: string, newCount: number, firstDone: Date) {
    const realm = await RealmHandler.openRealm([ProgressEntity.schema]);
    realm.write(() => {
      let progressEntity:
        | ProgressEntity
        | undefined = realm.objectForPrimaryKey(
        ProgressEntity.schema.name,
        actionId,
      );
      if (progressEntity) {
        progressEntity.count = newCount;
        progressEntity.lastDate = new Date();
        progressEntity.firstDone = firstDone;
      }
    });
    RealmHandler.closeRealm(realm);
  }

  async getProgress(actionId: string) {
    const realm = await RealmHandler.openRealm([ProgressEntity.schema]);
    let progressEntity: ProgressEntity | undefined = realm.objectForPrimaryKey(
      ProgressEntity.schema.name,
      actionId,
    );

    let actionProgress: ActionProgress;
    if (!progressEntity) {
      actionProgress = await this.createProgress({
        actionId: actionId,
        count: 0,
      });
    } else {
      actionProgress = {
        count: progressEntity.count,
        lastDone: progressEntity.lastDate,
        firstDone: progressEntity.firstDone,
      };
    }
    RealmHandler.closeRealm(realm);
    return actionProgress;
  }

  async createProgress({
    count,
    actionId,
  }: {
    count: number;
    actionId: string;
  }): Promise<ActionProgress> {
    const realm = await RealmHandler.openRealm([ProgressEntity.schema]);
    const entity = new ProgressEntity(actionId, count, new Date());
    realm.write(() => {
      realm.create(ProgressEntity.schema.name, entity);
    });
    RealmHandler.closeRealm(realm);
    return {
      count: entity.count,
      lastDone: entity.lastDate,
      firstDone: entity.firstDone,
    };
  }
}
