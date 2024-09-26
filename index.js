import express from 'express'
import config from './src/utils/config.js'
import cors from 'cors'
import appRoutes from './src/routes/index.js'


const PORT = config.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(appRoutes)

app.listen(PORT, ()=>(console.log(`Server listening to port ${PORT}`)))