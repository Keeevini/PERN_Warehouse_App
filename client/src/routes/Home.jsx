import React from 'react';

import Header from '../components/Header';
import AddWarehouse from '../components/AddWarehouse';
import WarehouseList from '../components/WarehouseList';

const Home = () => {
	return (
		<div>
			<Header />
			<AddWarehouse />
			<WarehouseList />
		</div>
	);
};


export default Home