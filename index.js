require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const kanbanRouter = require('./routes/kanbanRouter');
const initializeSocket = require('./utils/socket');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use('/api/kanban', kanbanRouter);

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
