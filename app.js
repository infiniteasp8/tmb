const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 3000;

// Load in the mongoose models
const {Task} = require('./db/models/task.model');

// Load Middleware
app.use(bodyParser.json());   //middle ware will parse the body of http request

// Cors middleware
app.use(cors()) ;



//********* ROUTE HANDLERS ********* 

//List routes 
/* 
--GET /lists
--purpose - get all lists
*/
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });
/* 
-- POST /lists
-- purpose- Create New List
*/ 

app.post('/tasks', async (req, res) => {
    const taskData = req.body;
  
    if (!taskData || !taskData.priority || !taskData.title || !taskData.description || !taskData.dueDate) {
      return res.status(400).json({ error: 'All fields (priority, title, description, dueDate) are required.' });
    }
  
    try {
      const newTask = new Task(taskData);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task' });
    }
  });

  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndRemove(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  });



/*  
--path /lists/:id
--Purpose Get single list by ID and update it
*/


app.patch('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});






app.listen(port, ()=>{
     console.log(`Server is listening at port ${port}`);
});