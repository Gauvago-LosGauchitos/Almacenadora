'use strict'

import { Schema, model } from "mongoose";

const tareaSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    fechaInicio:{
        type: String,
        required: true
    },
    fechaFin:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    nombreYapellidoPersona:{
        type: String,
        required: true
    }
})

export default model('tarea', tareaSchema)

