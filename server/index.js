const express = require("express");
const cors=require("cors");
const app = express();
require('dotenv').config()
app.use(cors());
const mongoose = require('mongoose');
const task= require("./model/Todo_task");
mongoose.connect(process.env.DB_PATH)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("db connected",process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    });

//this is use for craeting the body of userdata into json file  
app.use(express.json());

//getting all task
app.get("/gettask", async (req, res) => {
    try {
        const todo_task = await task.find();
        res.status(200).json(todo_task)
    }
    catch (error) {
        res.status(400).json(error.message)
    }

})

//creating task
app.post("/createtask", async (req, res) => {
    const { task_name, task_description } = req.body;
    try {
        const todo_task = await task.create({ 
            task_name,
            task_description
        });
        res.status(200).json(todo_task)
    }
    catch (error) {
        res.status(400).json(error.message)
    }

})
 //getting single task
 app.get("/getsingletask/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singletask = await task.findById({ _id: id });
        res.status(200).json(singletask);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

//deleteing task
app.delete("/deletetask/:id",async(req,res)=>{
    const{id}=req.params;
    try {
        const deletetask=await task.findByIdAndDelete({_id:id});
        res.status(200).json(deletetask);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

//updating status of task task
app.put("/updatetask/:id",async(req,res)=>{
    const{id}=req.params;
   
    try {
        const updatedtask_status=await task.findByIdAndUpdate({_id:id},{status:true})
        res.status(200).json(updatedtask_status);

    } catch (error) {
        res.status(400).json(error.message);
    }
})


