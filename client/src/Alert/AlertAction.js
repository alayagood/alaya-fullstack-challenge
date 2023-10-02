export const ALERT = 'ALERT';
export const ALERT_CLEARED = 'ALERT_CLEARED';

export function alert(err) {
  return {
    type: ALERT,
    err,
  };
}

export function alertCleared() {
  return {
    type: ALERT_CLEARED,
  };
}
