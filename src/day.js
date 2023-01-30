// UTC時刻を受け取り、type="datetime-local"のvalue属性のフォーマットに変換して返す
export const convertLocal = (ISO) => {
  // このときのISOはYYYY-MM-DDTHH:MM:SSZ
  // const localTime = new Date(`${ISO.slice(0, -1)}-09:00`); // 現地時刻のDateオブジェクトを作成
  // return localTime.toISOString().slice(0, -5);
  const localTime = new Date(ISO);
  const year = localTime.getFullYear();
  let month = localTime.getMonth() + 1; // 0〜11がgetMonthの戻り値
  month = month < 10 ? `0${month}` : month;
  let date = localTime.getDate();
  date = date < 10 ? `0${date}` : date;
  let hours = localTime.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = localTime.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

// 締切を受け取り、締切までの残り時間を返す
export const diffDate = (limit) => {
  const dayUnit = 60 * 60 * 24 * 1000; // ms
  const hourUnit = 60 * 60 * 1000; // ms
  // const diff = Math.abs(new Date(limit) - new Date());
  const diff = new Date(limit) - new Date();
  if (diff < 0) {
    return '期限切れ';
  }
  const diffDays = diff / dayUnit;
  const diffHours = diff / hourUnit;
  if (diffDays < 1) {
    return `${Math.floor(diffHours)}時間`;
  }
  return `${Math.floor(diffDays)}日`;
};
