import NotifService from '../libs/PushNotification';

export default (onRegister, onNotification) => {
  const service = new NotifService(onRegister, onNotification);
  service.scheduleNotification(
    'おはようございます',
    '今日のアクションを設定しよう',
    9,
  );
  service.scheduleNotification(
    'こんばんは',
    '今日やったアクションを登録しよう',
    21,
  );
};
