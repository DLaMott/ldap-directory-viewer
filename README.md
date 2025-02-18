# LDAP Directory Viewer

This is a lightweight and simple-to-setup LDAP directory viewer built with React for the frontend and Node.js for the backend. The primary purpose of this project is to provide a clean and intuitive interface to browse users and groups in one or more LDAP directories. It supports querying multiple directories and retrieving user or group information seamlessly.
![Image](https://github.com/user-attachments/assets/4e5b985e-4315-43a1-8f0a-49946784a258)
![Image2](https://github.com/user-attachments/assets/1b730100-d1b5-47fa-8170-65708501c615)
## Key Features

- **Multi-Directory Support**: Allows switching between multiple LDAP directories (e.g., DirectoryOne and DirectoryTwo) with ease. Developers can add more as needed.
- **Search Functionality**: Provides user and group search capabilities based on unique identifiers (e.g., user IDs or group names). Can be adjusted per directory schema.
- **Dynamic Configuration**: Easily configure directory connections and credentials through environment variables.
- **Lightweight and Simple**: Designed to be minimalistic and easy to set up, requiring minimal resources.
- **Customizable**: The project can be extended to include additional features, such as advanced filtering, editing entries, and authentication.

## Project Structure

### Backend (`server.js`)
The backend is built using Node.js and the `ldapts` library for interacting with LDAP directories. It exposes RESTful API endpoints for querying users and groups from configured directories.

#### Endpoints
- **GET /api/DirectoryOne/user/:id**: Fetches user details by ID from DirectoryOne.
- **GET /api/DirectoryOne/group/:id**: Fetches group details by name from DirectoryOne.
- **GET /api/DirectoryTwo/user/:id**: Fetches user details by ID from DirectoryTwo.
- **GET /api/DirectoryTwo/group/:id**: Fetches group details by name from DirectoryTwo.

#### Environment Variables
The backend uses environment variables (via the `dotenv` package) to configure LDAP directory connections:
```env
FIRST_URL=ldap://localhost:10389
FIRST_DN=uid=admin,ou=system
FIRST_PWD=secret
SECOND_URL=ldap://localhost:10389
SECOND_DN=uid=admin,ou=system
SECOND_PWD=secret
```
These values can be adjusted to point to your specific LDAP directories and credentials.

### Frontend (`App.js`)
The frontend is built with React, providing a simple UI for interacting with the backend.

#### Key UI Components
- **Tabs**: Toggle between DirectoryOne and DirectoryTwo.
- **Search Controls**: Select between user and group search, enter the identifier (e.g., user ID or group name), and fetch the information.
- **Results Display**: Displays the fetched user or group information in a table format.

## Setup Instructions

### Prerequisites
- Node.js (v16 or later recommended)
- A running LDAP server (e.g., Apache Directory Server)

### Steps to Set Up
1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DLaMott/ldap-directory-viewer.git
   cd ldap-directory-viewer
   ```

3. **Install Dependencies**:

      ```bash
      npm install
      ```
      
5. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory with your LDAP directory details:
   
   ```env
   FIRST_URL=ldap://your-ldap-url:port
   FIRST_DN=your-bind-dn
   FIRST_PWD=your-password
   SECOND_URL=ldap://your-second-ldap-url:port
   SECOND_DN=your-second-bind-dn
   SECOND_PWD=your-second-password
   ```

   Included is an optional docker-compose.yml that spins up an openldap container that preloads a local ldap server. You can set up this by doing the following:

   - Open a terminal within local-ldap
   - Execute `docker compose up`
   - Set the following env variables:
  ```env  
   FIRST_URL=ldap://localhost:389
   SECOND_URL=ldap://localhost:389
   FIRST_DN="cn=admin,dc=example,dc=com"
   FIRST_PWD=admin
   SECOND_DN="cn=admin,dc=example,dc=com"
   SECOND_PWD=admin
   ```

7. **Start the project**:

The porject is set to start the server and client concurrently. This can be adjust by editing the `package.json` file
   ```bash
   npm start
   ```

8. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## How to Customize

### Add More Directories
You can add more directories by extending the environment variables and modifying the `server.js` and `app.js` files to handle additional directory connections.

### Enhance Search Capabilities
You can add filters or advanced search options by modifying the `filter` parameter in the `ldapts` search queries.

### Add Authentication
Secure the viewer by adding authentication mechanisms (e.g., JWT, session-based authentication) in the backend.

### Style the UI
Customize the design by modifying the CSS in `App.css` to match your branding or preferences.

### Support Write Operations
Extend the backend and frontend to support creating, updating, or deleting LDAP entries.

## Lightweight Design
This application is intentionally minimal, with a focus on simplicity and ease of use. The backend and frontend are lightweight, making it easy to deploy and use even on low-resource environments.

## Conclusion
The LDAP Directory Viewer is a flexible and user-friendly tool for querying LDAP directories. Its simplicity makes it ideal for small teams or testing environments, while its extensibility allows it to grow to meet more complex needs. Set it up today and start exploring your directory data effortlessly!

