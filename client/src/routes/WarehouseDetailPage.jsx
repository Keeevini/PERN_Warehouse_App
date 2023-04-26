import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { WarehousesContext } from "../context/WarehousesContext";
import WarehouseFinder from "../apis/WarehouseFinder";
import Shelves from "../components/Shelves";
import AddShelf from "../components/AddShelf";
import ShelfList from '../components/ShelfList';

const WarehouseDetailPage = () => {
	const { id } = useParams();
	const { selectedWarehouse, setSelectedWarehouse } = useContext(
		WarehousesContext
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await WarehouseFinder.get(`/${id}`);
				console.log(response);

				setSelectedWarehouse(response.data.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{selectedWarehouse && (
				<>
					<h1 className="text-center display-1">
						{selectedWarehouse.warehouse.name}
					</h1>
					<Shelves warehouse={selectedWarehouse.warehouse} />
					<AddShelf />
				</>
			)}
		</div>
	);
};


export default WarehouseDetailPage;