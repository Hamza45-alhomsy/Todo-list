import React from "react";
import "../../styles/footer.css";
function Footer() {
	return (
		<footer className="footer">
			<p>© {new Date().getFullYear()} My App. All rights reserved.</p>
			<nav>
				<a href="/about">About</a> |<a href="/contact">Contact</a> |
				<a href="/privacy">Privacy Policy</a>
			</nav>
		</footer>
	);
}

export default Footer;
