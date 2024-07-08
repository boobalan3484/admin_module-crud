const mongoose = require("mongoose")

const addEmployee = new mongoose.Schema(
    {
        _id:{
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

module.exports = mongoose.model("EmployeeCollection", addEmployee)