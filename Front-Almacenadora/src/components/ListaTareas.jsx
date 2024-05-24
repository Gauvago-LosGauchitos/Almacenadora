import { useState, useEffect } from "react";
import logo from '../assets/img/gauchitosLogoHD.png'
import { Input } from "./Input";
import { useTask } from "../shared/hooks/useTask.jsx";
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
} from "../shared/validators/validator.js";
import toast from 'react-hot-toast';
import './ListaTareas.css';

export const TodoListForm = () => {
    // Manejo de tareas utilizando el hook useTask
    const { addTask, updateTask, deleteTask, isLoading, getTasks, tasks, markTask } = useTask();

    // Estado del formulario y su inicialización
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
    });

    // Comprobar si el botón de enviar está deshabilitado
    const isSubmitButtonDisabled =
        !formData.nombre.isValid ||
        !formData.description.isValid ||
        !formData.fechaInicio.isValid ||
        !formData.fechaFin.isValid ||
        !formData.nombreYapellidoPersona.isValid;

    // Obtener tareas cuando el componente se monta
    const fetchTasks = async () => {
        try {
            await getTasks();
        } catch (error) {
            console.error("Error al obtener las tareas en fetchTasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Actualizar el valor del campo del formulario
    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }));
    };

    // Validar el campo del formulario al perder el foco
    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "nombre":
                isValid = validateNombre(value);
                break;
            case "description":
                isValid = validateDescription(value);
                break;
            case "fechaInicio":
                isValid = validateFechaInicio(value);
                break;
            case "fechaFin":
                isValid = validateFechaFin(value);
                break;
            case "nombreYapellidoPersona":
                isValid = validateNombreYapellidoPersona(value);
                break;
            default:
                break;
        }
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }));
    };

    // Resetear el formulario
    const resetForm = () => {
        setFormData({
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
        });
    };

    // Función para agregar una tarea
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await addTask(
                formData.nombre.value,
                formData.description.value,
                formData.fechaInicio.value,
                formData.fechaFin.value,
                formData.nombreYapellidoPersona.value
            );
            toast.success('Tarea agregada correctamente');
            fetchTasks()
            resetForm()
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
            toast.error('Error al agregar la tarea');
        }
    };

    // Función para editar una tarea
    const handleUpdateTask = async (taskId) => {
        try {
            await updateTask(taskId, {
                nombre: formData.nombre.value,
                description: formData.description.value,
                fechaInicio: formData.fechaInicio.value,
                fechaFin: formData.fechaFin.value,
                nombreYapellidoPersona: formData.nombreYapellidoPersona.value
            });
            toast.success('Tarea actualizada correctamente');
            fetchTasks();
            resetForm()
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            toast.error('Error al actualizar la tarea');
        }
    };

    // Función para eliminar una tarea
    const handleDeleteTask = async (taskId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                await deleteTask(taskId);
                toast.success('Tarea eliminada correctamente');
                fetchTasks();
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
                toast.error('Error al eliminar la tarea');
            }
        }
        resetForm();
    };

    // Función para marcar tarea como hecho
    const handleMarkTask = async (taskId) => {
        try {
            await markTask(taskId, {
                estado: taskId.estado // Esto parece incorrecto, debería ser `true` para marcar como hecho
            });
            toast.success('Tarea actualizada correctamente');
            fetchTasks();
            resetForm()
        } catch (error) {
            console.error('Error al marcar la tarea:', error);
            toast.error('Error al marcar la tarea');
        }
    };

    // Función para verificar si la tarea ya está completada para marcar checkbox
    const handleCheckboxChange = (task) => {
        return task.estado // Retorna el estado de la tarea
    };

    // Manejar el clic en una fila de la tabla para cargar los valores de la tarea en el formulario
    const handleRowClick = (task) => {
        setFormData({
            nombre: {
                value: task.nombre,
                isValid: true,
                showError: false
            },
            description: {
                value: task.description,
                isValid: true,
                showError: false
            },
            fechaInicio: {
                value: task.fechaInicio,
                isValid: true,
                showError: false
            },
            fechaFin: {
                value: task.fechaFin,
                isValid: true,
                showError: false
            },
            nombreYapellidoPersona: {
                value: task.nombreYapellidoPersona,
                isValid: true,
                showError: false
            }
        });
    };

    return (
        <div className="todo-list-container">
            {/* Barra de navegación con el logo */}
            <nav class="navbar">
                <div class="navbar-content">
                    <img
                        className="nav-logo"
                        src={logo}
                        alt="Logo"/>
                </div>
            </nav>
            <div className="container">
                {/* Formulario para agregar tareas */}
                <form className="todo-form" onSubmit={handleAddTask}>
                    {/* Inputs para cada campo del formulario */}
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
                    {/* Botón para agregar tarea */}
                    <div className="container-button">
                        <button disabled={isSubmitButtonDisabled} class="button">
                            <span class="button__text">Add Task</span>
                            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                        </button>
                    </div>
                </form>
                {/* Lista de tareas */}
                <div className="task-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th><center>Nombre de la tarea</center></th>
                                <th><center>Descripción</center></th>
                                <th><center>Fecha de Inicio</center></th>
                                <th><center>Fecha de Fin</center></th>
                                <th><center>Encargado</center></th>
                                <th><center>Acciones</center></th>
                                <th><center>Completado</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.length > 0 && tasks.map((task, index) => (
                                // Renderizar filas de la tabla con información de la tarea
                                <tr key={index} >
                                    <td>{task.nombre}</td>
                                    <td>{task.description}</td>
                                    <td>{task.fechaInicio}</td>
                                    <td>{task.fechaFin}</td>
                                    <td>{task.nombreYapellidoPersona}</td>
                                    {/* Botones de edición y eliminación */}
                                    <td>
                                        <button class="editBtn" onClick={() => handleRowClick(task)} >
                                            <svg height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                                ></path>
                                            </svg>
                                        </button>
                                        <button class="bin-button" onClick={() => handleDeleteTask(task._id)}>
                                            <svg
                                                class="bin-top"
                                                viewBox="0 0 39 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                                <line
                                                    x1="12"
                                                    y1="1.5"
                                                    x2="26.0357"
                                                    y2="1.5"
                                                    stroke="white"
                                                    stroke-width="3"
                                                ></line>
                                            </svg>
                                            <svg
                                                class="bin-bottom"
                                                viewBox="0 0 33 39"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path
                                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                    ></path>
                                                </mask>
                                                <path
                                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                    fill="white"
                                                    mask="url(#path-1-inside-1_8_19)"
                                                ></path>
                                                <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                                <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                            </svg>
                                        </button>

                                    </td>
                                    {/* Checkbox para marcar como completada la tarea */}
                                    <td>
                                        <label class="cyberpunk-checkbox-label">
                                            <input type="checkbox" checked={handleCheckboxChange(task)} class="cyberpunk-checkbox" onClick={() => handleMarkTask(task._id)} />
                                            Hecho</label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};