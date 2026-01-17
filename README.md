**Task Management System
A full-stack task management application built with the node.js,react.js and using MySQL.
This application allows users to register, log in, and manage their daily tasks through a clean, responsive dashboard.

Features
User Authentication: Secure Login and Registration using JWT (JSON Web Tokens).

Task CRUD: Create, Read, and Delete tasks.

Database Integration: Persistent storage using MySQL and Sequelize ORM.

Responsive UI: Modern, clean interface built with React and Vite.
🛠️ Tech StackComponentTechnologyFrontendReact.js, Vite, Axios,
React RouterBackendNode.js, Express.jsDatabaseMySQLORMSequelizeSecurityBcrypt.js, JWT
⚙️ Installation & Setup1. Clone the RepositoryBashgit clone https://github.com/Aartimehr/TaskManagementSystem.git
cd TaskManagementSystem
2. Backend SetupNavigate to the backend folder: cd backendInstall dependencies:
npm installCreate a .env file and add your credentials:Code snippetDB_NAME=task_manager_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
JWT_SECRET=supersecret123
PORT=5000
Start the server: npm run start3. Frontend SetupOpen a new terminal and navigate to the frontend: 
cd frontendInstall dependencies: npm installStart the development server: npm run dev
