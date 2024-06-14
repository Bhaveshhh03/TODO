const mongoose=require('mongoose')

const taskSchema = new mongoose.Schema({
    task_name:{
        type:String,
        require:true
    },
    task_description:{
        type:String,
        
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const task=mongoose.model("todo",taskSchema)
module.exports = task