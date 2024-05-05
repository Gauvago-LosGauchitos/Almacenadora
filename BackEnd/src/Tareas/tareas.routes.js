import express from 'express'
import { createTarea, deleteTarea, editTareas, listTareas, markTarea } from './tareas.controler.js'

const api = express.Router();

api.post('/createTarea', createTarea)
api.get('/listTareas', listTareas)
api.put('/editTarea/:id', editTareas)
api.delete('/deleteTarea/:id', deleteTarea)
api.patch('/markTarea/:id', markTarea)


export default api