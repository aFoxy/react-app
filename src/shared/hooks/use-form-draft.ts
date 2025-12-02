export function useFormDraft<T>(storageKey: string = 'formDraft') {
  const restoreDraft = () => {
    const saved = localStorage.getItem(storageKey)

    if (saved) {
      try {
        const parsed = JSON.parse(saved)

        if (parsed && Object.keys(parsed).length > 0) {
          return parsed
        }
      } catch {
        return
      }

      return
    }
  }

  const clearDraft = () => {
    localStorage.removeItem(storageKey)
  }

  const saveDraft = (data: T) => {
    localStorage.setItem(storageKey, JSON.stringify(data))
  }

  return {
    restoreDraft,
    saveDraft,
    clearDraft,
  }
}
