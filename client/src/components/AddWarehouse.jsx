import React, { useState, useContext } from 'react';

import WarehouseFinder from '../apis/WarehouseFinder';
import { WarehousesContext } from '../context/WarehousesContext';

const AddWarehouse = () => {
	const { addWarehouses } = useContext(WarehousesContext);
	const [name, setName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await WarehouseFinder.post("/", {
				name
			});
			console.log(response.data.data);
			addWarehouses(response.data.data.warehouse);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="mb-4">
			<form action="">
				<div className="form-row">
					<div className="col">
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							className="form-control"
							placeholder="name"
						/>
					</div>
					<button
						onClick={handleSubmit}
						type="submit"
						className="btn btn-primary"
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddWarehouse;