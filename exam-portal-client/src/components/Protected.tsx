import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router";


export default function Protected() {
	const { token, user } = useAuth();

	if (!token || !user?.name || !user?.role) {
		 return <Navigate to="/" replace />;
	}

	return <Outlet />;
}