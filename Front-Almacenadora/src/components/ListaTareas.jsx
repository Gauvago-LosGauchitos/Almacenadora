import { useState, useEffect } from "react"
import { Input } from "./Input"
import axios from "axios";
import { useTask } from "../shared/hooks/useTask.jsx"
import {    
    descriptionValidationMessage,
    fechaFinValidationMessage,
    nombreValidationMessage,
    nombreYapellidoPersonaValidationMessage,
    validateDescription,
    validateFechaFin,
    validateFechaInicio,
    validateNombre,
    validateNombreYapellidoPersona
} from "../shared/validators/validator.js"
import toast from 'react-hot-toast'
import './ListaTareas.css'

export const TodoListForm = () => {
    const { addTask, updateTask, deleteTask, isLoading, getTasks } = useTask()
    
    const [tasks, setTasks] = useState([])

    const [formData, setFormData] = useState({
        nombre: {
            value: "",
            isValid: false,
            showError: false
        },
        description: {
            value: "",
            isValid: false,
            showError: false
        },
        fechaInicio: {
            value: "",
            isValid: false,
            showError: false
        },
        fechaFin: {
            value: "",
            isValid: false,
            showError: false
        },
        nombreYapellidoPersona: {
            value: "",
            isValid: false,
            showError: false
        }
    })

    const isSubmitButtonDisabled =
        !formData.nombre.isValid ||
        !formData.description.isValid ||
        !formData.fechaInicio.isValid ||
        !formData.fechaFin.isValid ||
        !formData.nombreYapellidoPersona.isValid

   useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasks()
                setTasks(tasksData)
                console.log('Tasks:', tasks)
            } catch (error) {
                console.error("Error al obtener las tareas en fetchTasks:", error)
            }
        }
        fetchTasks()
    }, [])



    const handleValueChange = (value, field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case "nombre":
                isValid = validateNombre(value)
                break
            case "description":
                isValid = validateDescription(value)
                break
            case "fechaInicio":
                isValid = validateFechaInicio(value)
                break
            case "fechaFin":
                isValid = validateFechaFin(value)
                break
            case "nombreYapellidoPersona":
                isValid = validateNombreYapellidoPersona(value)
                break
            default:
                break
        }
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleAddTask = async (e) => {
        e.preventDefault()
        addTask(
            formData.nombre.value,
            formData.description.value,
            formData.fechaInicio.value,
            formData.fechaFin.value,
            formData.nombreYapellidoPersona.value
        )
    }

    const handleUpdateTask = async (taskId) => {
        try {
            await updateTask(taskId, {
                nombre: formData.nombre.value,
                description: formData.description.value,
                fechaInicio: formData.fechaInicio.value,
                fechaFin: formData.fechaFin.value,
                nombreYapellidoPersona: formData.nombreYapellidoPersona.value
            })
            toast.success('Tarea actualizada correctamente')
        } catch (error) {
            console.error('Error al actualizar la tarea:', error)
            toast.error('Error al actualizar la tarea')
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                await deleteTask(taskId)
                toast.success('Tarea eliminada correctamente')
            } catch (error) {
                console.error('Error al eliminar la tarea:', error)
                toast.error('Error al eliminar la tarea')
            }
        }
    }

    return (
        <div className="todo-list-container">
            <form className="todo-form" onSubmit={handleAddTask}>
                <Input
                    field="nombre"
                    label="Nombre de la tarea"
                    value={formData.nombre.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombre.showError}
                    validationMessage={nombreValidationMessage}
                />

                <Input
                    field="description"
                    label="Descripción"
                    value={formData.description.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.description.showError}
                    validationMessage={descriptionValidationMessage}
                />

                <Input
                    field="fechaInicio"
                    label="Fecha de inicio"
                    value={formData.fechaInicio.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaInicio.showError}
                    validationMessage={validateFechaInicio}
                />

                <Input
                    field="fechaFin"
                    label="Fecha de fin"
                    value={formData.fechaFin.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaFin.showError}
                    validationMessage={fechaFinValidationMessage}
                />

                <Input
                    field="nombreYapellidoPersona"
                    label="Nombre y apellido de la persona"
                    value={formData.nombreYapellidoPersona.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombreYapellidoPersona.showError}
                    validationMessage={nombreYapellidoPersonaValidationMessage}
                />

                <button disabled={isSubmitButtonDisabled}>
                    Agregar Tarea
                </button>
            </form>
            <div>
                <h2>Tareas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                            <th>Nombre y Apellido de la Persona</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.nombre}</td>
                                <td>{task.description}</td>
                                <td>{task.fechaInicio}</td>
                                <td>{task.fechaFin}</td>
                                <td>{task.nombreYapellidoPersona}</td>
                                <td>
                                    <button onClick={() => handleUpdateTask(task._id)}>Actualizar</button>
                                    <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
