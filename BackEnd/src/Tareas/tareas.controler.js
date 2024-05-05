'use strict'

import Tareas from "./tareas.model.js"


//Crear una nueva tarea
export const createTarea = async (req, res)=>{
    try {
        const data = req.body
        
         // Convertir las fechas a cadenas
        const fechaInicio = new Date(data.fechaInicio).toISOString().split('T')[0];
        const fechaFin = new Date(data.fechaFin).toISOString().split('T')[0];

        // Crear la tarea con las fechas como cadenas
        const tarea = await Tareas.create({...data, fechaInicio, fechaFin});

        

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

// Marcar tarea como completada
export const markTarea = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Encontrar la tarea por su ID
      let tarea = await Tareas.findById(id);
  
      // Si la tarea no existe, devolver un mensaje de error
      if (!tarea) {
        return res.status(404).send({ message: 'Tarea no encontrada' });
      }
      // Actualizar el estado de la tarea dependiendo del estado(true o false)
      if(tarea.estado === false){
      tarea.estado = true;
      }else if(tarea.estado === true){
        tarea.estado = false;
      }
  
      // Guardar la tarea actualizada
      await tarea.save();
  
      // Devolver un mensaje de éxito y la tarea actualizada
      return res.status(200).send({ message: 'Tarea marcada como completada correctamente', tarea });
  
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error marcando la tarea como completada' });
    }
  };