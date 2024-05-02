import { useState, useEffect } from "react"
import toast from 'react-hot-toast'
import { addTaskRequest, getTaskRequest, updateTaskRequest, deleteTaskRequest } from "../../services/api.js"

export const useTask = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([])

    const addTask = async (nombre, description, fechaInicio, fechaFin, nombreYapellidoPersona) => {
        setIsLoading(true)
        try {
            const tarea = {
                nombre,
                description,
                fechaInicio,
                fechaFin,
                nombreYapellidoPersona
            }
            const response = await addTaskRequest(tarea)
            console.log(response)
            await getTasks()
        } catch (error) {
            console.error('Error al agregar la tarea:', error)
            toast.error('Error al agregar la tarea')
        } finally {
            setIsLoading(false)
        }
    }

    const getTasks = async () => {
        console.log(tasks)
        setIsLoading(true)
        try {
            const taskData = await getTaskRequest()
            console.log("Datos de las tareas:", taskData)
            setTasks(taskData)
        } catch (error) {
            console.error('Error al obtener las tareas:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateTask = async (taskId, updatedTask) => {
        setIsLoading(true)
        try {
            const response = await updateTaskRequest(taskId, updatedTask)
            console.log(response)
            await getTasks()
        } catch (error) {
            console.error('Error al actualizar la tarea:', error)
            toast.error('Error al actualizar la tarea')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteTask = async (taskId) => {
        setIsLoading(true)
        try {
            const response = await deleteTaskRequest(taskId)
            console.log(response)
            await getTasks()
        } catch (error) {
            console.error('Error al eliminar la tarea:', error)
            toast.error('Error al eliminar la tarea')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTasks()
        console.log(tasks)
    }, [])

    return {
        addTask,
        getTasks,
        updateTask,
        deleteTask,
        isLoading,
        tasks
    }
}
