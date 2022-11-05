import React from "react";
import "./css/card.css";

export const Card = ({ name, image, types, id ,hp}) => {
	return (
		<div className="card">
			<img
				className="card_image"
				src={image}
				alt="imagen no encontrada"
				width="170px"
				height="180px"
			></img>

			<h3>{name}</h3>
			<h3>{hp}</h3>
			<h4 className="title_types">TYPES</h4>
			<div className="card_content">
				{types.map(e => (
					<h5>{e.name ? e.name : e}</h5>
				))}
			</div>
		</div>
	);
};
