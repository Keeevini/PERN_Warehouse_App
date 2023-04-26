import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { WarehousesContext } from "../context/WarehousesContext";
import WarehouseFinder from "../apis/WarehouseFinder";

const UpdateWarehouse = (props) => {
	const { id } = useParams();
	let history = useNavigate();
	const { warehouses } = useContext(WarehousesContext);
	const [name, setName] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await WarehouseFinder.get(`/${id}`);
			console.log(response.data.data);
			setName(response.data.data.restaurant.name);
		};

		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const updatedWarehouse = await WarehouseFinder.put(`/${id}`, {
			name,
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
				<button
					type="submit"
					onClick={handleSubmit}
					className="btn btn-primary"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default UpdateWarehouse;