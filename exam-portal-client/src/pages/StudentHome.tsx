import AppBar from '../components/NavBar';
import {Outlet} from "react-router";

export default function StudentHome() {
	return (
		<>
			<AppBar />
			<Outlet />
		</>
	);
}



