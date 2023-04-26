import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import WarehouseFinder from '../apis/WarehouseFinder';
import { WarehousesContext } from '../context/WarehousesContext';
import ShelfFinder from '../apis/ShelfFinder';
import { ShelvesContext } from '../context/ShelvesContext';

const WarehouseList = (props) => {
	const { warehouses, setWarehouses } = useContext(WarehousesContext);
	const { shelves, setShelves } = useContext(ShelvesContext);
	let history = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await WarehouseFinder.get("/");
				// console.log(response.data.data);
				setWarehouses(response.data.data.warehouses);
			} catch (err) {}
		};

		fetchData();
	}, []);

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		try {
			const response = await WarehouseFinder.delete(`/${id}`);
			setWarehouses(
				warehouses.filter((warehouse) => {
					return warehouse.id !== id;
				})
			);
			const response2 = await ShelfFinder.get("/");
			setShelves(response2.data.data.shelves);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdate = (e, id) => {
		e.stopPropagation();
		history(`/warehouses/${id}/update`);
	};

	const handleWarehouseSelect = (id) => {
		history(`/warehouses/${id}`);
	};

	const renderCount = (warehouse) => {
		if (!warehouse.count) {
			return <td>0</td>;
		}
		return <td>{warehouse.count}</td>;
	}

	return (
		<div className="list-group">
			<table className="table table-hover table-dark">
				<thead>
					<tr className="bg-primary">
					<th scope="col">Warehouse</th>
					<th scope="col">Last Updated</th>
					<th scope="col">Shelf Count</th>
					<th scope="col">Edit</th>
					<th scope="col">Delete</th>
				</tr>
			</thead>
			<tbody>
				{warehouses &&
					warehouses.map((warehouse) => {
						return (
							<tr
								onClick={() => handleWarehouseSelect(warehouse.id)}
								key={warehouse.id}
							>
								<td>{warehouse.name}</td>
								<td>{warehouse.last_updated}</td>
								<td>{renderCount(warehouse)}</td>
								<td>
									<button
										onClick={(e) => handleUpdate(e, warehouse.id)}
										className="btn btn-warning"
									>
										Update
									</button>
								</td>
								<td>
									<button
										onClick={(e) => handleDelete(e, warehouse.id)}
										className="btn btn-danger"
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default WarehouseList;