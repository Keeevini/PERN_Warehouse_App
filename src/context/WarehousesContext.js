import React, { useState, createContext } from "react";

export const WarehousesContext = createContext();

export const WarehousesContextProvider = (props) => {
	const [warehouses, setWarehouses] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);

	const addWarehouses = (warehouse) => {
		setWarehouses([...warehouses, warehouse]);
	};
	return (
		<WarehousesContext.Provider
			value={{
				warehouses,
				setWarehouses,
				addWarehouses,
				selectedWarehouse,
				setSelectedWarehouse,
			}}	
		>
			{props.children}
		</WarehousesContext.Provider>
	);
};