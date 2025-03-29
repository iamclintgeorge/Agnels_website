## Steps to Setup Project

### Admin Backend

1. **Install dependencies**

   - Run the following command to install the necessary npm packages:
     ```bash
     npm install
     ```

2. **Setup phpMyAdmin**

   - Set up phpMyAdmin to manage your MySQL database.

3. **Create a `.env` file**

   - Create a new file called `.env` in the root of your project and paste the following content there:

     ```ini
     # Database connection
     host = localhost
     user = root
     password =
     db_name = agneladmin

     port = 3663
     ```

   - **Note:** Make sure to add your own phpMyAdmin database configuration.

4. **Start the development server**
   - Run the following command to start the development server:
     ```bash
     npm run dev
     ```

<br>
<br>

## Backend Folder Structure

```
                        admin -------------------------------------
                          |                                       |
server.js -> routes -> routes.js  -> website ---------------> controllers ---------> models
                                        |                         |                     |
                                        |____ homepage            |____ website         |____ website
                                        |____ department          |____ admin           |____ admin
                                        |____ aboutus


```
