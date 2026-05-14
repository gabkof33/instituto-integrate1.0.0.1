type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends PlainObject>(target: T, source: Partial<T>): T {
  const output: PlainObject = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const currentValue = output[key];

    if (isPlainObject(currentValue) && isPlainObject(value)) {
      output[key] = deepMerge(currentValue, value);
      continue;
    }

    output[key] = value;
  }

  return output as T;
}
