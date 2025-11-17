import { createMiddleware } from '@mswjs/http-middleware'
import cors from 'cors'
import express from 'express'
import logger from 'pino-http'

import { initializeDb } from './db'
import { handlers } from './handlers'
import { APP_MOCK_API_PORT, APP_URL } from './env'

const app = express()

app.use(
  cors({
    origin: APP_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(logger())
app.use(createMiddleware(...handlers))

initializeDb().then(() => {
  console.log('Mock DB initialized')
  app.listen(APP_MOCK_API_PORT, () => {
    console.log(`Mock API server started at http://localhost:${APP_MOCK_API_PORT}`)
  })
})
