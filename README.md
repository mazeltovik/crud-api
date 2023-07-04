# crud-api

# Instructions
Install all dependencies by command **npm install**. Then if you want laucn basic simple server run command **npm run start:dev**, this command will starting server in development mode on port 4000, also if you will run **npm run start:multi**  this command lauching server in multi mode, but without Cluster API. Command **npm run start:prod** will create build, but you must use this command with prefix **single** like this **npm run start:prod single** for single server and **npm run start:prod multi** for multi server. Use this endpoint **api/user/** with slash at the end.

# Scoring: CRUD API
### Basic Scope

-   **+10**  The repository with the application contains a  `Readme.md`  file containing detailed instructions for installing, running and using the application
-   **+10**  **GET**  `api/users`  implemented properly
-   **+10**  **GET**  `api/users/{userId}`  implemented properly
-   **+10**  **POST**  `api/users`  implemented properly
-   **+10**  **PUT**  `api/users/{userId}`  implemented properly
-   **+10**  **DELETE**  `api/users/{userId}`  implemented properly
-   **+6**  Users are stored in the form described in the technical requirements
-   **+6**  Value of  `port`  on which application is running is stored in  `.env`  file
## Advanced Scope
-   **+30**  Task implemented on Typescript
-   **+10**  Processing of requests to non-existing endpoints implemented properly
-   **+10**  Errors on the server side that occur during the processing of a request should be handled and processed properly
-   **+10**  Development mode:  `npm`  script  `start:dev`  implemented properly
-   **+10**  Production mode:  `npm`  script  `start:prod`  implemented properly
## Hacker Scope
-   **+25**  There is horizontal scaling for application with a  **load balancer**