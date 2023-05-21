require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");

const app = express() 

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Get all warehouses
app.get("/api/v1/warehouses", async (req, res) => {
	try{
		const wareshousesData = await db.query(
			"SELECT * FROM warehouses LEFT JOIN (SELECT warehouse_id, COUNT(*) FROM shelves GROUP BY warehouse_id) shelves ON warehouses.id = shelves.warehouse_id"
		);

		res.status(200).json({
			status: "success",
			results: wareshousesData.rows.length,
			data: {
				warehouses: wareshousesData.rows,
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Get a warehouse
app.get("/api/v1/warehouses/:id", async (req, res) => {
	try {
		const warehouse = await db.query(
			"SELECT * FROM warehouses LEFT JOIN (SELECT warehouse_id, COUNT(*) FROM shelves GROUP BY warehouse_id) shelves ON warehouses.id = shelves.warehouse_id WHERE id = $1",
			[req.params.id]
		);

		const shelves = await db.query(
			"SELECT * FROM shelves WHERE warehouse_id = $1",
			[req.params.id]
		);

		res.status(200).json({
			status: "success",
			data: {
				warehouse: warehouse.rows[0],
				shelves: shelves.rows,
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});


// Create a warehouse
app.post("/api/v1/warehouses", async (req, res) => {
	try {
		const results = await db.query(
			"INSERT INTO warehouses (name, last_updated) values ($1, CURRENT_TIMESTAMP) returning *",
			[req.body.name]
		);

		res.status(201).json({
			status: "success",
			data: {
				warehouse: results.rows[0],
			},
		});

	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Update warehouse
app.put("/api/v1/warehouses/:id", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE warehouses SET name = $1, last_updated = CURRENT_TIMESTAMP where id = $2 returning *",
			[req.body.name, req.params.id]
		);

		res.status(200).json({
			status: "success",
			data: {
				warehouse: results.rows[0],
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Delete a warehouse
app.delete("/api/v1/warehouses/:id", async (req, res) => {
	try {
		const results = db.query(
			"DELETE FROM warehouses where id = $1",
			[req.params.id]
		);
		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Get all shelves
app.get("/api/v1/shelves", async (req, res) => {
	try{
		const shelvesData = await db.query(
			"SELECT * FROM shelves LEFT JOIN (SELECT name AS warehouse_name, id AS copied_id FROM warehouses GROUP BY id) warehouses ON shelves.warehouse_id = copied_id"
		);
		res.status(200).json({
			status: "success",
			results: shelvesData.rows.length,
			data: {
				shelves: shelvesData.rows,
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Get a shelf
app.get("/api/v1/shelves/:id", async (req, res) => {
	try {
		const shelf = await db.query(
			"SELECT * FROM shelves LEFT JOIN (SELECT name AS warehouse_name, id AS copied_id FROM warehouses GROUP BY id) warehouses ON shelves.warehouse_id = copied_id WHERE id = $1",
			[req.params.id]
		);

		res.status(200).json({
			status: "success",
			data: {
				shelf: shelf.rows[0],
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Create a shelf (uses an existing warehouse's id)
app.post("/api/v1/warehouses/:id/addShelf", async (req, res) => {
	try {

		// Check for max shelves
		const shelfCount = await db.query(
			"SELECT COUNT(*) FROM shelves WHERE (warehouse_id = $1) AND (zone = $2);",
			[req.params.id, req.body.zone]
		);

		if (shelfCount.rows[0].count >= 10) {
			throw new Error('Maximum shelves for the zone reached');
		}

		const results = await db.query(
			"INSERT INTO shelves (warehouse_id, name, zone, last_updated) values ($1, $2, $3, CURRENT_TIMESTAMP) returning *;",
			[req.params.id, req.body.name, req.body.zone]
		);
		res.status(201).json({
			status: "success",
			data: {
				shelf: results.rows[0],
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Update shelf
app.put("/api/v1/shelves/:id", async (req, res) => {
	try {

		// Check for max shelves
		const shelfCount = await db.query(
			"SELECT COUNT(*) FROM shelves WHERE (warehouse_id = $1) AND (zone = $2);",
			[req.body.warehouse_id, req.body.zone]
		);
		
		if (shelfCount.rows[0].count >= 10) {
			throw new Error('Maximum shelves for the zone reached');
		}

		const results = await db.query(
			"UPDATE shelves SET name = $1, warehouse_id = $2, zone = $3, last_updated = CURRENT_TIMESTAMP where id = $4 returning *",
			[req.body.name, req.body.warehouse_id, req.body.zone, req.params.id]
		);

		res.status(200).json({
			status: "success",
			data: {
				shelf: results.rows[0],
			},
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});

// Delete a shelf
app.delete("/api/v1/shelves/:id", async (req, res) => {
	try {
		const results = db.query(
			"DELETE FROM shelves where id = $1",
			[req.params.id]
		);
		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		return res.status(400).json({ error: err.toString() });
	}
});


app.get('/', function (req, res) {
  console.log("blank page");

  res.status(200).json({
			status: "success",
		});
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server is running and listening on port ${port}`);
});

