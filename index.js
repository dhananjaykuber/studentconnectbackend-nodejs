require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const initializeSocket = require('./utils/socket');

// Kanban routes
const commentRoute = require('./routes/kanban/comment');
const memberRoute = require('./routes/kanban/member');
const notificationRoute = require('./routes/kanban/notification');
const projectRoute = require('./routes/kanban/project');
const stageRoute = require('./routes/kanban/stage');
const taskRoute = require('./routes/kanban/task');
const userRoute = require('./routes/kanban/user');

// GPT quiz routes
const quizRoute = require('./routes/gptQuiz/quiz');

// Blog routes
const blogRoute = require('./routes/blog');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Kanban
app.use('/api/kanban', userRoute);
app.use('/api/kanban', projectRoute);
app.use('/api/kanban', stageRoute);
app.use('/api/kanban', taskRoute);
app.use('/api/kanban', memberRoute);
app.use('/api/kanban', commentRoute);
app.use('/api/kanban', notificationRoute);

// GPT Quiz
app.use('/api/gpt-quiz', quizRoute);

// Blog
app.use('/api/blog', blogRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const io = initializeSocket(server);
    app.locals.io = io;

    server.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
