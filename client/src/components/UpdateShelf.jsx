import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ShelvesContext } from "../context/ShelvesContext";
import ShelfFinder from "../apis/ShelfFinder";

const UpdateShelf = (props) => {
	const { id } = useParams();
	let history = useNavigate();
	const { shelves } = useContext(ShelvesContext);
	const [name, setName] = useState("");
	const [warehouseId, setWarehouseId] = useState("");
	const [zone, setZone] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await ShelfFinder.get(`/${id}`);
			console.log(response.data.data);
			setName(response.data.data.shelf.name);
			setWarehouseId(response.data.data.shelf.warehouse_id);
			setZone(response.data.data.shelf.zone);
		};

		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updateShelf = await ShelfFinder.put(`/${id}`, {
			name,
			warehouse_id : warehouseId,
			zone
		});

		history("/");
	};

	return (
		<div>
			<form action="">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						id="name"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="warehouseId">Warehouse ID</label>
					<input
						value={warehouseId}
						onChange={(e) => setWarehouseId(e.target.value)}
						id="warehouseId"
						className="form-control"
						type="text"
					/>
				</div>
				<div className="form-group">
						<label htmlFor="zone">Zone</label>
						<select
							value={zone}
							onChange={(e) => setZone(e.target.value)}
							id="zone"
							className="custom-select"
						>
							<option disabled>Zone</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
					</div>
				<button
					type="submit"
					onClick={handleSubmit}
					className="btn btn-primary"
				>
					Update Shelf
				</button>
			</form>
		</div>
	);
};

export default UpdateShelf;