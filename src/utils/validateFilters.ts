export const validateFilters = (filters: object, avaibleFilters: string[]) => {
  const invalidFilters = [];
  const object = {};
  for (const i in filters) {
    if (avaibleFilters.includes(filters[i][0])) {
      if (!object[filters[i][0]]) {
        object[filters[i][0]] = filters[i][1];
      }
    } else {
      invalidFilters.push(filters[i][0]);
    }
  }
  return { invalidFilters: invalidFilters, mapFilter: object };
};
