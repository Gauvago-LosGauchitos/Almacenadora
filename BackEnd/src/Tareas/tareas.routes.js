import express from 'express'
import { createTarea, deleteTarea, editTareas, listTareas } from './tareas.controler.js'

const api = express.Router();

api.post('/createTarea', createTarea)
api.get('/listTareas', listTareas)
api.put('/editTarea/:id', editTareas)
api.delete('/deleteTarea/:id', deleteTarea)

export default api