import React from 'react';

import Header from '../components/Header';
import AddWarehouse from '../components/AddWarehouse';
import WarehouseList from '../components/WarehouseList';
import ShelfList from '../components/ShelfList';

const Home = () => {
	return (
		<div>
			<Header />
			<AddWarehouse />
			<WarehouseList />
			<ShelfList />
		</div>
	);
};


export default Home