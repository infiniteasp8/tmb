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
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });

app.post('/tasks', async (req, res) => {
    const taskData = req.body;
  
    if (!taskData || !taskData.priority || !taskData.title || !taskData.description || !taskData.dueDate) {
      return res.status(400).json({ error: 'All fields (priority, title, description, dueDate) are required.' });
    }
  
    try {
      const newTask = new Task(taskData);
      await newTask.save();
      res.status(201).send(newTask);
    } catch (error) {
      res.status(500).send({ error: 'Error creating task' });
    }
  });

  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndRemove(taskId);
      if (!deletedTask) {
        return res.status(404).send({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
      res.status(500).send({ error: 'Error deleting task' });
    }
  });






app.patch('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
    if (!updatedTask) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    res.status(500).send({ error: 'Error updating task' });
  }
});




app.get("/", (req, res) => res.type('html').send(html));




const html = `Hello!`

app.listen(port, ()=>{
     console.log("Server is listening at port 3000");
});