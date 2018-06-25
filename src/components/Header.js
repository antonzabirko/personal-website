import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
		componentDidMount() {
		}
		render() {
				return (
						<header className="">
								<div className="content-container header">
										<div className="text-white">
												<div className="header__text">
														<h4 className="text-muted display-5">Anton Zabirko</h4>
												</div>
												<section>
														<h1 className="display-2">Projects</h1>
														<hr/>
														<div className="project">
																<section>
																		<Link to="/" className="underline display-4 override">
																				Expense Map
																		</Link>
																</section>
																<section className="icons-section">
																		<Link to="/">
																				<i className="fab fa-github fa-4x"></i>
																		</Link>
																		<Link to="/">
																				<i className="fas fa-link fa-4x"></i>
																		</Link>

																		<Link to="/">
																				<i className="fas fa-info fa-4x"></i>
																		</Link>
																</section>
														</div>
												</section>
										</div>
								</div>
								<div className="content-container header">
												<h1 className="text-muted display-5">About</h1>
												<h4 className="text-muted display-5">Brooklyn College Undergraduate</h4>
												<h4 className="text-muted display-5">Brooklyn College Undergraduate</h4>
												<h1 className="text-muted display-5">Contact</h1>
								</div>
						</header>
				)
		}
}

export default Header;