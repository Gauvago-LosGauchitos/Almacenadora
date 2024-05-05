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
    const { addTask, updateTask, deleteTask, isLoading, getTasks, tasks } = useTask();

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

    const isSubmitButtonDisabled =
        !formData.nombre.isValid ||
        !formData.description.isValid ||
        !formData.fechaInicio.isValid ||
        !formData.fechaFin.isValid ||
        !formData.nombreYapellidoPersona.isValid;

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

    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }));
    };

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
            fetchTasks();
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
            toast.error('Error al agregar la tarea');
        }
    };

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
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            toast.error('Error al actualizar la tarea');
        }
    };

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
        
    };

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
            <nav class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-content">
                    <img
                        className="nav-logo"
                        src={logo}
                        alt="Logo" />
                </div>
            </nav>
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
                <div className="container-button">
                    { /*<button disabled={isSubmitButtonDisabled}>
                    Agregar Tarea
                </button>
                */}
                    <button disabled={isSubmitButtonDisabled} class="button">
                        <span class="button__text">Add Task</span>
                        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                    </button>
                </div>
            </form>
            <div>
                <h2>Tareas</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                            <th>Nombre y Apellido de la Persona</th>
                            <th>Acciones</th>
                            <th>Completado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.length > 0 && tasks.map((task, index) => (
                           
                            <tr key={index} onClick={() => handleRowClick(task)}>
                                <td>{task.nombre}</td>
                                <td>{task.description}</td>
                                <td>{task.fechaInicio}</td>
                                <td>{task.fechaFin}</td>
                                <td>{task.nombreYapellidoPersona}</td>
                                
                                <td>
                                
                                    <button className="edit-button" data-action="delete" onClick={() => handleUpdateTask(task._id)}>
                                        <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                        </svg>
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>
                                        <svg className="delete-svgIcon" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <label class="cyberpunk-checkbox-label">
                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                        Hecho</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

