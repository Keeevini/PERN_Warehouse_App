import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdateWarehousePage from './routes/UpdateWarehousePage';
import WarehouseDetailPage from './routes/WarehouseDetailPage';
import { WarehousesContextProvider } from "./context/WarehousesContext";


const App = () => {
	return (
		<WarehousesContextProvider>
			<div className="container">
				<Router>
					<Routes>
						<Route exact path="/" element={<Home/>}/>
						<Route exact path="/warehouses/:id/update" element={<UpdateWarehousePage/>}/>
						<Route exact path="/warehouses/:id" element={<WarehouseDetailPage/>}/>
					</Routes>
				</Router>
			</div>
		</WarehousesContextProvider>
	);
};


export default App;