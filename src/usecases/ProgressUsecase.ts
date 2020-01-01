import {ProgressRepository} from './../repositories/ProgressRepository';
export const ProgressUsecase = {
  async incrementProgress(actionIds: string[]) {
    for (const actionId of actionIds) {
      const progressEntity = await new ProgressRepository().getProgress(
        actionId,
      );
      if (!progressEntity) return;
      const newCount = progressEntity.count + 1;

      let firstDone: Date;
      if (!progressEntity.firstDone) {
        firstDone = new Date();
      } else {
        const diffTime =
          new Date().getTime() - progressEntity.lastDone.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);
        if (diffDays > 1) {
          firstDone = new Date();
        } else {
          firstDone = progressEntity.firstDone;
        }
      }

      new ProgressRepository().incrementProgress(actionId, newCount, firstDone);
    }
  },
};
