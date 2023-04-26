# PERN Warehouse App

 Authors: 
 - [Kevin Ni](https://github.com/Keeevini)

## Project Description

A web based application that keeps track of physical inventory placement.

Outline of the README:
- Basic features and tech stack
- Conceptual designs and thoughts
- Installation/usage
- Screenshots

### Basic Website Features:
- Displaying existing warehouses and shelfs
- Creating a new warehouse and deleting existing warehouses
- Creating a new shelf and assigning it a location
- Updating shelf and warehouse properties

### Languages/Tech Stack:
- PostgreSQL
- Express
- React
- Node.js

### Tools:
**Server side**
- Dotenv
- Nodemon
- Morgan
- Pg
- Cors

**Client side**
- React app
- React-router-dom
- Bootstrap
- Axios

## Design
The following includes assumptions made and interpretations of the prompt. This is a high level concept of the application.

### Database

Since we have multiple warehouses and shelves that correlate to each warehouse, we will create 2 tables. All entries will include a last updated to keep track of when changes occurred.

The warehouses table will keep track of warehouses and also allow adding more properties to a warehouse in the future.

```SQL
CREATE TABLE warehouses (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	last_updated TIMESTAMPTZ
);
```

The shelves table will keep track of all the shelves. Each shelf must correspond to a warehouse by id. Additionally, when a warehouse is deleted, we assume all shelves related to the warehouse will be removed since the warehouse no longer exists. Each shelf must have a unique name. Each shelf also must be in a zone and the zones are labeled 1 to 12. Thus, we will include a constraint to make sure the zone is a valid number.

```SQL
CREATE TABLE shelves (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
	name VARCHAR(50) NOT NULL UNIQUE,
	zone INT NOT NULL check(zone >= 1 and zone <= 12),
	last_updated TIMESTAMPTZ
);
```
### API

|CRUD Operation | Method | URL |
| :--- | :--- | :--- |
| Retrieve all warehouses | GET | /api/v1/warehouses
| Retrieve one warehouse | GET | /api/v1/warehouses/:id |
| Create warehouse | POST | /api/v1/warehouses |
| Update warehouse | PUT | /api/v1/warehouses/:id |
| Delete warehouse | DELETE | /api/v1/warehouses/:id |

|CRUD Operation | Method | URL |
| :--- | :--- | :--- |
| Retrieve all shelves | GET | /api/v1/shelves
| Retrieve one shelf | GET | /api/v1/shelves/:id |
| Create shelf | POST | /api/v1/warehouses/:id |
| Update shelf | PUT | /api/v1/shelves/:id |
| Delete shelf | DELETE | /api/v1/shelves/:id |

The only variation is creating a shelf. This is done because a shelf must be created in an existing warehouse. An additional create shelf feature in the home page could be created in the future if need be.

### Pages

|Page Name | Function | URL |
| :--- | :--- | :--- |
| Home Page | Form for creating a warehouse, Warehouse List, Shelf List | /
| Warehouse Detail | Form for creating a shelf, Shelf List | /warehouses/:id |
| Update Warehouse | Form for updating a warehouse | /warehouses/:id/update |
| Update Shelf | Form for updating a shelf | /shelves/:id/update |

A home page would allow for easy viewing of available warehouses and existing shelves. A warehouse detail page allows for adding shelves.


### Assumptions:
In conclusion, these are the assumptions made when coming up with the design.

- The location of the shelf within a zone does not matter since it is not specified. Only the count matters (cannot exceed 10 per zone)
- When a warehouse is removed, all shelves related will also no longer exist (be removed)
- Since a shelf must be created in a warehouse, adding shelves can only be done in a warehouse details page
- The unique name of a shelf is the same as the display name
- Warehouses do not have unique names

### Future:
Features not implemented so far include:
- Buttons back to the home page
- A search bar to search for shelf by name
- Grouping shelfs by zone in the warehouse page
- Fancier warehouse layouts to accomodate more restrictions

These were decided to be not a priority.

## Installation/Usage
The project uses the PERN stack, which means a local PostgreSQL database, a local backend server and a local client server.

### PostgreSQL Database
Install PostgreSQL on your computer, and then set up a PostgreSQL database with the following commands.
```SQL
CREATE DATABASE inventory_app;
```

```SQL
CREATE TABLE warehouses (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	last_updated TIMESTAMPTZ
);
```

```SQL
CREATE TABLE shelves (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	warehouse_id BIGINT NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
	name VARCHAR(50) NOT NULL UNIQUE,
	zone INT NOT NULL check(zone >= 1 and zone <= 12),
	last_updated TIMESTAMPTZ
);
```

### Node.js Server
Open a terminal in the server folder, and run `npm install`.

You will need to create a `.env` file in the server folder with the following properties:
```txt
PORT=3000

PGUSER={postgres}
PGHOST={localhost}
PGPASSWORD={password}
PGDATABASE=inventory_app
PGPORT=5432
```
(Replace the brackets with your information)

Then run `npm start` to start the server.

### React Server
Open a terminal the client folder, and run `npm install`

You will need to create a `.env` file in the client folder with the following properties:
```txt
PORT=3001
```

If you choose to run your backend server on a different port than 3000, simply change the baseURL in all the files in the apis folder.

### Usage
That should be all the setup required. `http://localhost:3001/` should be the URL of the home page. The following section of screenshots should be a guide if there are any questions on how to use the web application.


## Screenshots

Empty home page
![image](https://user-images.githubusercontent.com/16064366/234564898-ef908dd5-a461-47f5-af69-6e4be88dab02.png)

Creating a new warehouse
![image](https://user-images.githubusercontent.com/16064366/234565668-3cbe3be3-49c8-4094-89dd-8ca7deae49ed.png)

Generated new warehouse with a shelf count of 0
![image](https://user-images.githubusercontent.com/16064366/234565787-378d1686-3273-4615-bbcd-215267a98f9b.png)

Click on the new warehouse entry to see warehouse details and add a new shelf
![image](https://user-images.githubusercontent.com/16064366/234565996-26646141-70cf-4130-9ce8-4e81c60322bb.png)

Several car shelfs displayed in a warehouse detail
![image](https://user-images.githubusercontent.com/16064366/234566159-b31399e5-6310-494c-ad49-186467b42a44.png)

Filled home page
![image](https://user-images.githubusercontent.com/16064366/234566420-c5d71127-d0f8-41a5-aa2c-3143e79ad2fb.png)

Warehouse update page
![image](https://user-images.githubusercontent.com/16064366/234566537-fbb444b9-135b-4814-abd1-6aaf0f729c19.png)

Shelf update page
![image](https://user-images.githubusercontent.com/16064366/234566772-c02e70f6-8fb7-4280-a6c8-a4e7dbc555d1.png)

## Testing
To be added
