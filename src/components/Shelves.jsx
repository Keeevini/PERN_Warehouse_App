import React from 'react';

const Shelves = ({ shelves }) => {
	return (
		<div className="row row-cols-3 mb-2">
			{shelves.map((shelf) => {
				return (
					<div
						key={shelf.id}
						className="card text-white bg-primary mb-3 mr-4"
						style={{ maxWidth: "30%" }}
					>
						<div className="card-header d-flex justify-content-between">
							<span>{shelf.name}</span>
							<span>{shelf.zone}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Shelves;