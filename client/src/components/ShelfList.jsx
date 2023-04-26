import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ShelfFinder from '../apis/ShelfFinder';
import { ShelvesContext } from '../context/ShelvesContext';

const ShelfList = (props) => {
	const { shelves, setShelves } = useContext(ShelvesContext);
	let history = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await ShelfFinder.get("/");
				setShelves(response.data.data.shelves);
			} catch (err) {}
		};

		fetchData();
	}, []);

	const handleDelete = async (e, id) => {
		e.stopPropagation();
		try {
			const response = await ShelfFinder.delete(`/${id}`);
			setShelves(
				shelves.filter((shelf) => {
					return shelf.id !== id;
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdate = (e, id) => {
		e.stopPropagation();
		history(`/shelves/${id}/update`);
	};

	return (
		<div className="list-group">
			<table className="table table-hover table-dark">
				<thead>
					<tr className="bg-primary">
					<th scope="col">Shelf</th>
					<th scope="col">Warehouse</th>
					<th scope="col">Zone</th>
					<th scope="col">Last Updated</th>
					<th scope="col">Edit</th>
					<th scope="col">Delete</th>
				</tr>
			</thead>
			<tbody>
				{shelves &&
					shelves.map((shelf) => {
						return (
							<tr>
								<td>{shelf.name}</td>
								<td>{shelf.warehouse_name}</td>
								<td>{shelf.zone}</td>
								<td>{shelf.last_updated}</td>
								<td>
									<button
										onClick={(e) => handleUpdate(e, shelf.id)}
										className="btn btn-warning"
									>
										Update
									</button>
								</td>
								<td>
									<button
										onClick={(e) => handleDelete(e, shelf.id)}
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

export default ShelfList;