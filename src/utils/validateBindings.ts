export const validateBindings = (bindings: string[], object: Object) => {
  const keys = Object.entries(object);
  const missing = [];
  for (const i in bindings) {
    if (keys.filter(x => x[0] === bindings[i]).length === 0) {
      missing.push(bindings[i]);
    }
  }
  return missing;
};
