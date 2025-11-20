import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from 'nanoid'
import { MOCK_EMPLOYEES } from '@shared/mocks/employees'
import { AUDIT_MOCKS } from '@shared/mocks/audit-records'

const models = {
  user: {
    id: primaryKey(nanoid),
    username: String,
    email: String,
    password: String,
    createdAt: Date.now,
  },
  employees: {
    id: primaryKey(nanoid),
    name: String,
    position: String,
    department: String,
    email: String,
    phone: String,
    hireDate: Date,
    salary: Number,
    isActive: Boolean,
    createdAt: Date.now,
  },
  audit: {
    id: primaryKey(nanoid),
    status: String,
    userId: String,
    action: String,
    timestamp: Date,
  },
}

export const db = factory(models)

export type Model = keyof typeof models

const dbFilePath = './mocked-db.json'

export const loadDb = async () => {
  // If we are running in a Node.js environment
  if (typeof window === 'undefined') {
    const { readFile, writeFile } = await import('fs/promises')
    try {
      const data = await readFile(dbFilePath, 'utf8')

      return JSON.parse(data)
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        const emptyDB = {}
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2))

        return emptyDB
      } else {
        console.error('Error loading mocked DB:', error)

        return null
      }
    }
  }

  // If we are running in a browser environment
  return Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'))
}

export const storeDb = async (data: string) => {
  // If we are running in a Node.js environment
  if (typeof window === 'undefined') {
    const { writeFile } = await import('fs/promises')
    await writeFile(dbFilePath, data)
  } else {
    // If we are running in a browser environment
    window.localStorage.setItem('msw-db', data)
  }
}

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return

  const data = await loadDb()
  data[model] = db[model].getAll()
  await storeDb(JSON.stringify(data))
}

export const initializeDb = async () => {
  const database = await loadDb()
  MOCK_EMPLOYEES.forEach((value) => {
    db.employees.create({ ...value })
  })

  AUDIT_MOCKS.forEach((value) => {
    db.audit.create({ ...value })
  })

  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key]

    if (dataEntries) {
      dataEntries?.forEach((entry: Record<string, unknown>) => {
        model.create(entry)
      })
    }
  })
}

export const resetDb = () => {
  window.localStorage.clear()
}
