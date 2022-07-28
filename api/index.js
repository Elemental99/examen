import express from 'express'
import { postRequest } from './controllers/index.js'

const app = express()
const route = express.Router()

app.use(express.json())

route.get('/', (req, res) => {
    res.send('Hello World!')
})

route.post('/', postRequest)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
