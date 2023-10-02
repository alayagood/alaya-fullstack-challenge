export const REDIRECT = 'REDIRECT';

export function redirect(url) {
  return {
    type: REDIRECT,
    to: url,
  };
}
