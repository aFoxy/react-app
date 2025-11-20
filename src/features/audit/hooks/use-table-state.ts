import { useSearchParams } from 'react-router'

export const useTableState = () => {
  const [params, setParams] = useSearchParams()
  const getValue = (key: string, defaultValue = '') => params.get(key) || defaultValue

  const setParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params)

    if (value === null || value === '') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }

    if (key !== 'page' && key !== 'size') {
      newParams.set('page', '1')
    }

    setParams(newParams)
  }

  const setMultipleParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(params)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })

    setParams(newParams)
  }

  const resetFilters = () => {
    const newParams = new URLSearchParams()
    newParams.set('page', params.get('page') || '1')
    newParams.set('size', params.get('size') || '10')
    setParams(newParams)
  }

  const getAllFilters = () => {
    const filters: Record<string, string> = {}
    params.forEach((value, key) => {
      if (!['page', 'size'].includes(key)) {
        filters[key] = value
      }
    })

    return filters
  }

  return {
    page: getValue('page', '1'),
    size: getValue('size', '10'),

    isActive: getValue('status'),
    category: getValue('department'),
    dateFrom: getValue('dateFrom'),
    dateTo: getValue('dateTo'),
    name: getValue('name'),
    sortBy: getValue('sortBy'),

    setParam,
    setMultipleParams,
    resetFilters,
    getAllFilters,

    params,
  }
}
