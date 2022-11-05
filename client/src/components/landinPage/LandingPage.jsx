import React from "react";
import { Link } from "react-router-dom";
import pokemonFondo from "../imagenes/pokemonFondo.mp4";
import "./css/landingPage.css";

function LandingPage() {
	return (
		<section className="full">
			<div className="contenedor">
				<h1 className="titulo">Bienvenido Pokemon App</h1>
{/* <video className="main" src={pokemonFondo}  autoPlay loop muted/> */}
				<br />
				<Link to="/home">
					<button className="button">Ingresar</button>
				</Link>
			</div>
		</section>
	);
}

export default LandingPage;
