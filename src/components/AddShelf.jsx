import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import WarehouseFinder from "../apis/WarehouseFinder";

const AddShelf = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useNavigate();
	console.log(id);

	const [name, setName] = useState("");
	const [zone, setZone] = useState("Zone");

	const handleSubmitShelf = async (e) => {
		e.preventDefault();
		try {
			const response = await WarehouseFinder.post(`/${id}/addShelf`, {
				name,
				zone
			});
			history("/");
			history(location.pathname);
		} catch (err) {}
	};

	return (
		<div className="mb-2">
			<form action="">
				<div className="form-row">
					<div className="form-group col-8">
						<label htmlFor="name">Name</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							id="name"
							placeholder="name"
							type="text"
							className="form-control"
						/>
					</div>
					<div className="form-group col-4">
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
				</div>
				<button
					type="submit"
					onClick={handleSubmitShelf}
					className="btn btn-primary"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddShelf;