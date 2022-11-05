import "./App.css";
import LandingPage from "./components/landinPage/LandingPage.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { CrearPokemones } from "./components/Home/CrearPokemones";
import { Detalle } from "./components/Home/Detalle";



function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/home" component={Home} />
				<Route exact path='/countries/:id' render={({ match }) => <Detalle id={match.params.id} />} />
				<Route exac path="/crear" component={CrearPokemones} />
			</div>
			
		</BrowserRouter>
	);
}

export default App;
