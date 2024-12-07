# Stage 3: System Design

## Overview:

This stage involves designing the system architecture, databases, and user interface.

### High-Level Architecture:

- **Frontend**: React application with TypeScript, using Tailwind CSS for styling.
- **Backend**: Express.js for handling API requests, Prisma for database interaction.
- **Database**: SQL database (e.g., MySQL/PostgreSQL) to store customer, order, and product information.

### Entity-Relationship Diagram (ERD):

- An ERD diagram will be created in the `/docs/design/erd` folder to visually represent the relationships between entities like `Customers`, `Orders`, `Products`, and `Payments`.

### Data Flow:

- **User Actions**: The user interacts with the frontend, triggering API calls to the backend.
- **Backend Actions**: The backend processes the data and interacts with the database via Prisma.
- **Database**: Data is stored in the SQL database and can be retrieved or updated based on user actions (e.g., placing orders, updating inventory).
