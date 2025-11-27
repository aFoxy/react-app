function normalizeField(field: string) {
  return field.replace(/\[\d+\]/g, '[]')
}

export function findStepByServerError(
  serverError: Record<string, string>,
  stepFields: readonly string[][]
) {
  const keys = Object.keys(serverError)

  if (!keys.length) return -1

  const first = normalizeField(keys[0])

  for (let i = 0; i < stepFields.length; i++) {
    const list = stepFields[i].map(normalizeField)

    if (list.includes(first)) return i

    if (list.some((f) => first === f || first.startsWith(f + '.') || f.startsWith(first + '.')))
      return i
  }

  return -1
}
