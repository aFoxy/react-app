export const queryKeys = {
  employees: {
    all: ['employees'] as const,
    list: () => [...queryKeys.employees.all, 'list'],
    details: (id: string) => [...queryKeys.employees.all, id] as const,
    departments: () => [...queryKeys.employees.all, 'departments'],
  },
}
