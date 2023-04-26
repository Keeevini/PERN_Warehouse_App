# PERN Warehouse App

 Authors: 
 - [Kevin Ni](https://github.com/Keeevini)

## Project Description

A web based application that keeps track of physical inventory placement. 

### Website Features:
- Displaying existing warehouses and shelfs
- Searching for a shelf to find its warehouse and zone location
- Creating a new warehouse and deleting existing warehouses
- Creating a new shelf and assigning it a location
- Updating shelf properties

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

The shelves table will keep track of all the shelves. Each shelf must correspond to a warehouse by id. Each shelf also must be in a zone and the zones are labeled 1 to 12. Thus, we will include a constraint to make sure the zone is a valid number.

```SQL
CREATE TABLE shelves (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	warehouse_id BIGINT NOT NULL REFERENCES warehouses(id),
	name VARCHAR(50) NOT NULL,
	zone INT NOT NULL check(zone >= 1 and zone <= 12),
	last_updated TIMESTAMPTZ
);
```



## Installation/Usage
To be added

## Testing
To be added