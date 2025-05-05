#Team-Collaborate
A lightweight, full-stack collaboration platform for task and user management.

##Overview
------------------------------------------------------------------------------------
Team-Collaborate lets organizations onboard users, assign tasks, monitor progress and manage accounts—all through a clean REST API and a React-powered frontend. Admins have a dedicated dashboard to view and manage every user’s profile, tasks, and status, while regular users see only their own task list and progress.

🚀**Features**
----------------------------------------------------------------------------------
#**Sign Up**
-#**New users register by providing name, email, company ID and password.*
-#**Credentials securely stored in MongoDB.*

#**Login & Authentication**
-#**Users log in with email or company ID + password.*
-#Access granted via JSON Web Tokens (JWT).*

#**AI Support Assistant**
-#*A chat widget on the Login page lets users ask questions or report issues in real time.*
-#*Built with OpenAI’s API—messages are sent to your /api/support endpoint and answered instantly*.
-#*Admin-defined fallback replies for common problems (e.g. account lockouts).*

#**Admin Dashboard**
-#*View all registered users, their roles and activity history.*
-#*Track each user’s task progress in real time.*

#**User Dashboard**
-#*Each user sees their own daily tasks, deadlines, and completion status.*

#**User Management**
-#*Admins can edit user profiles, change roles, reset passwords or suspend accounts.*

#**Password Reset & OTP**
-#*“Forgot Password” flow sends a one-time code via email or SMS.*
-#*Users verify the OTP and set a new password.*



|Features	                 |  Technologies clearly used                      |
|------------------------- |-------------------------------------------------|
|Frontend                  |  React.js · Chakra UI · Axios                   |
|Backend                   | 	Node.js · Express.js · Mongoose (MongoDB)      |
|Database	                 |  MongoDB (Atlas Cloud)                          |
|Authentication & Security |  JWT (JSON Web Tokens), bcrypt.js (hashing)     |
|OTP & Password Reset	     |  NodeMailer (Email), OTP Generator              |
|AI Support Assistant	     |  OpenAI SDK · axios · custom /api/support route |
|Configuration             |  dotenv (env vars) · CORS                       | 

##**⚙️ Getting Started**
###Clone the repo

Copy code

```
bash
git clone https://github.com/your-username/team-collaborate.git
cd team-collaborate

bash
Copy code
cd backend
npm install
cp .env.example .env
# Fill in MONGODB_URL, JWT_SECRET, EMAIL/SMS credentials, etc.
npm run start
Frontend setup

bash
Copy code
cd ../frontend
npm install
cp .env.example .env
# Set REACT_APP_API_URL to your backend URL (e.g. http://localhost:5000/api)
npm start
```

#Use the App

#Sign up as a new user, then log in.
#If you sign up as an admin (or update your role in the database), you’ll see the Admin Dashboard.
#For password resets, click “Forgot Password” and follow the OTP flow.
#Admin can terminate accounts.
#if Admin terminate your account you can use Ai support assistant to unlock it.
