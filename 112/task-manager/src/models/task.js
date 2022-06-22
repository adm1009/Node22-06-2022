const mongoose = require("mongoose");
const validator = require("validator");

const taskschema = new mongoose.Schema({
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    }
})

taskschema.pre("save",async function(next){
    const task = this;

    console.log("just before saving");

    next();
})

const Task = mongoose.model("task",
taskschema);

module.exports = Task;