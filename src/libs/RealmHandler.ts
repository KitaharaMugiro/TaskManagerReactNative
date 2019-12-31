import Realm from 'realm';
export const RealmHandler = {
  closeRealm(realm: Realm) {
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  },
  async openRealm(schemas) {
    const realm = await Realm.open({
      schema: schemas,
      deleteRealmIfMigrationNeeded: true,
    });
    return realm;
  },
};
