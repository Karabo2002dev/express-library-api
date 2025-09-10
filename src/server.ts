import bodyParser from 'body-parser'
import express, {Express} from 'express'
import cors from 'cors'
import { loggerMiddleware } from './middleware/loggerMiddleware'
import router from './routes/author'

const app : Express = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(loggerMiddleware)
app.use("/", router)

const PORT : string | number = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})