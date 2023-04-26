import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdateWarehousePage from './routes/UpdateWarehousePage';
import UpdateShelfPage from './routes/UpdateShelfPage';
import WarehouseDetailPage from './routes/WarehouseDetailPage';
import { WarehousesContextProvider } from "./context/WarehousesContext";
import { ShelvesContextProvider } from "./context/ShelvesContext";


const App = () => {
	return (
		<WarehousesContextProvider>
			<ShelvesContextProvider>
				<div className="container">
					<Router>
						<Routes>
							<Route exact path="/" element={<Home/>}/>
							<Route exact path="/warehouses/:id/update" element={<UpdateWarehousePage/>}/>
							<Route exact path="/shelves/:id/update" element={<UpdateShelfPage/>}/>
							<Route exact path="/warehouses/:id" element={<WarehouseDetailPage/>}/>
						</Routes>
					</Router>
				</div>
			</ShelvesContextProvider>
		</WarehousesContextProvider>
	);
};


export default App;