'use strict'

import Tareas from "./tareas.model.js"


//Crear una nueva tarea
export const createTarea = async (req, res)=>{
    try {
        const data = req.body
        const tarea = await Tareas.create(data)

        return res.status(200).send({message: 'Tarea creada correctamente', tarea})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error creando una nueva tarea'})
        
    }
}

//Listar tareas
export const listTareas = async (req, res)=>{
    try {
        const tareas = await Tareas.find()

        return res.status(200).send({message: 'Tareas listadas correctamente', tareas})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error listando las tareas'})
        
    }
}

//Editar tareas
export const editTareas = async (req, res)=>{
    try {
        const {id} = req.params
        const data = req.body

        let tarea = await Tareas.findById(id)

        let updatedTarea = await Tareas.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        return res.status(200).send({message: 'Tarea editada correctamente', updatedTarea})

        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error editando la tarea'})
        
    }
}

//Eliminar tareas
export const deleteTarea = async ( req, res )=>{
    try {
        const { id } = req.params
        let eliminarTarea = await Tareas.findOneAndDelete({ _id: id })

        return res.status(200).send({message: 'Tarea eliminada correctamente', eliminarTarea})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error eliminando tarea'})
    }
}

