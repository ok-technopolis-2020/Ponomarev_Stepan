export function getId() {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};

export function isTextValid(text) {
  if (!text) {
    return false;
  }

  return true;
};