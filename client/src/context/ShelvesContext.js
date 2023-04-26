import React, { useState, createContext } from "react";

export const ShelvesContext = createContext();

export const ShelvesContextProvider = (props) => {
	const [shelves, setShelves] = useState([]);
	const [selectedShelf, setSelectedShelf] = useState(null);

	// const addWarehouses = (warehouse) => {
	// 	setWarehouses([...warehouses, warehouse]);
	// };
	return (
		<ShelvesContext.Provider
			value={{
				shelves,
				setShelves,
				// addWarehouses,
				selectedShelf,
				setSelectedShelf,
			}}	
		>
			{props.children}
		</ShelvesContext.Provider>
	);
};