require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const kanbanRouter = require('./routes/kanbanRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/kanban', kanbanRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
