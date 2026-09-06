export const getChangedFields = <T extends object>(
  initialValues: T,
  values: T,
): Partial<T> => {
  const entries = Object.entries(values);
  const changedEntries = entries.filter(([key, value]) => {
    return initialValues[key as keyof T] !== value;
  });
  return Object.fromEntries(changedEntries) as Partial<T>;
};
