const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Import Sequelize config
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/authRoutes', authRoutes);
app.use('/api/tasksRoutes', taskRoutes);

// Sync Database and Start Server
sequelize.sync({ force: false }) // 'force: false' prevents deleting data on every restart
  .then(() => {
    console.log("MySQL Database & Tables Synced");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("Could not connect to MySQL:", err));