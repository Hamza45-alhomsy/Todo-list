import Header from "./layouts/Header";
import MainContent from "./layouts/MainContent";
import MainLayout from "./layouts/MainLayout";
import "../styles/layout.css";

function Container() {
	return (
		<div className="app-container">
			<Header />
			<MainLayout />
		</div>
	);
}

export default Container;
