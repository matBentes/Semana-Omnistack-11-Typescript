import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: 'http://localhost:3333' // apenas essa url tem acesso a nossa api
}))
app.use(express.json())

app.use(routes)

app.listen(3333)