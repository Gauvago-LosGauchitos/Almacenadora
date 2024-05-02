'use strict'

//Importaciones
import { config } from "dotenv"
import express from 'express'
import tareaRoutes from '../Tareas/tareas.routes.js'
import cors from 'cors'

const app = express()
    config();
    const port = process.env.PORT || 2676

    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())

    app.use('/tarea', tareaRoutes)

    export const initServer = ()=>{
        app.listen(port)
        console.log(`Server HTTP running in port ${port}`)
    }