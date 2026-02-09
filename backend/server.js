const express = require('express');
require('dotenv').config({ path: './backend/.env' });



const app = express();
const cors = require('cors');
app.use(express.json());


const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/auth');


app.connectDB = require('./config/db');
app.connectDB();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/projects", authMiddleware, projectRoutes);
app.use("/", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});