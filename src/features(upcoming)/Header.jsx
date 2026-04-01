import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";

export default function Header() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sidebarWrapperRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			// If click is NOT inside sidebar wrapper or the button → close
			if (
				sidebarWrapperRef.current &&
				!sidebarWrapperRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setSidebarOpen(false);
			}
		}

		if (sidebarOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [sidebarOpen]);

	return (
		<div className="header">
			<button
				ref={buttonRef}
				className="sidebar-btn"
				type="button"
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				☰
			</button>

			{/* Sidebar wrapper controls animation via .open/.closed */}
			<div
				className={`sidebar-wrapper ${sidebarOpen ? "open" : "closed"}`}
				ref={sidebarWrapperRef}
				aria-hidden={!sidebarOpen}
			>
				<Sidebar />
			</div>

			<span className="header-title"> Todo List</span>
		</div>
	);
}
