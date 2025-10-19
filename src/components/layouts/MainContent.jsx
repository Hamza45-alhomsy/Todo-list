import React from "react";
import "../../styles/layout.css";
import "../../styles/mainContent.css";
import DailyPanel from "../layouts/DailyPanel.jsx";

function MainContent() {
	return (
		<div className="box-with-bar">
			<DailyPanel />
		</div>
		// <div className="content-area">Lists of all the components will go here</div>
	);
}

export default MainContent;
