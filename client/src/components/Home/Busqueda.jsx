import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../action/index";
import "./css/buscador.css";

export const Busqueda = ({ setCurrentPage }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const handleInputChange = e => {
		e.preventDefault();
		setName(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (name) {
			dispatch(getNamePokemon(name));
			setName("");
			setCurrentPage(1);
		}
		else {
			alert("Ingrese el nombre de un pokemon!!!");
		}
	};

	return (
		<div className="buscador_nav">
			<input
				type="text"
				placeholder="Buscar...."
				onChange={e => handleInputChange(e)}
				value={name}
			/>
			<button className="button" type="submit" onClick={e => handleSubmit(e)}>
				Buscar
			</button>
		</div>
	);
};
