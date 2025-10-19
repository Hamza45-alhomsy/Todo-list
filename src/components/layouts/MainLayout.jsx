import React from "react";
import "../../styles/layout.css";
import Footer from "./Footer.js";
import MainContent from "./MainContent";

function MainLayout() {
	return (
		<>
			<div className="main-layout">
				<MainContent />
				MainLayout
			</div>
			<Footer />
		</>
	);
}

export default MainLayout;
