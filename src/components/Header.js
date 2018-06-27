import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
		componentDidMount() {
		}
		render() {
				return (
						<header className="" id="bootstrap-overrides">
								<div className="content-container header">
										<div className="">
												<section className="about">
														<div className="">
																<h4 className="display-2 projects__section-title">Hi</h4>
																<hr align="center" id="small"/>
																<p className="h3 about__text">
																			I'm Anton Zabirko, a Comp Sci undergrad at Brooklyn College in NYC. I started
																		programming and debugging when I was 12 with ActionScript. I am currently a
																		front-end Javascript engineer frame-working React. I love rapid, AGILE, development
																		generously provided by Atlassian.
																</p>
														</div>
														<section className="about__links">
																<a href="https://twitter.com/AAZabirko"
																   target="_blank"
																   className=""
																   title="Twitter"
																>
																		<i className="fab fa-twitter fa-3x project__icon" />
																</a>
																<a href="https://www.linkedin.com/in/anton-zabirko/"
																   target="_blank"
																   className=""
																   title="LinkedIn">
																		<i className="fab fa-linkedin fa-3x project__icon" />
																</a>
																<a href="mailto: antonzabirko@outlook.com"
																   className=""
																   title="Email">
																		<i className="fas fa-envelope fa-3x project__icon" />
																</a>
																<a href="https://stackshare.io/antonzabirko/current/"
																   target="_blank"
																   className=""
																   title="Tech stack"
																>
																		<i className="fa fa-share-alt fa-3x project__icon"
																		   />
																</a>
														</section>
												</section>
												<section className="projects">
														<h1 className="display-2 projects__section-title">Projects</h1>
														<hr align="center" id="medium"/>
														<div className="project">
																<section className="project__title">
																		<a href="https://expensemap.herokuapp.com/"
																		   target="_blank"
																		   className="underline display-4 override">
																				Expense Map
																		</a>
																</section>
																<section>
																		<a href="https://github.com/antonzabirko/expensemap"
																		   target="_blank"
																		   className="project__links">
																				<i className="fab fa-github fa-3x project__icon" />
																				<p className="project__icon-text">Github source</p>
																		</a>
																</section>
														</div>
												</section>
												<section className="about">
														<div className="">
																<h4 className="display-2 projects__section-title">Docs</h4>
																<hr align="center" id="small"/>
																<p className="h3 docs__text">
																		<a href="#" target="_blank">
																		Resume (working on it)
																		</a>
																</p>
														</div>
												</section>
												<section className="about">
														<div className="">
																<h4 className="display-2 projects__section-title">About</h4>
																<hr align="center" id="small"/>
																<p className="h3 about__text">
																		In my spare time I love to program, buff my repos, and take care of my 14 year-old
																		elderly <a href="https://www.google.com/search?tbm=isch&q=oreo+havanese"
																		           target="_blank"
																						>
																							Havanese
																            </a> called Pooh.
																</p>
														</div>
												</section>
										</div>
								</div>
						</header>
				)
		}
}

export default Header;