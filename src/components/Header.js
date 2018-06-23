import React from 'react';
import { Link } from 'react-router-dom';
import Muuri from 'muuri';


class Header extends React.Component {
		componentDidMount() {
				//
				// Initialize stuff
				//

				var grid = null;
				var docElem = document.documentElement;
				var demo = document.querySelector('.grid-outer');
				var gridElement = demo.querySelector('.grid');
				var filterField = demo.querySelector('.filter-field');
				var searchField = demo.querySelector('.search-field');
				var sortField = demo.querySelector('.sort-field');
				var layoutField = demo.querySelector('.layout-field');
				var addItemsElement = demo.querySelector('.add-more-items');
				var characters = 'abcdefghijklmnopqrstuvwxyz';
				var filterOptions = ['red', 'blue', 'green'];
				var dragOrder = [];
				var uuid = 0;
				var filterFieldValue;
				var sortFieldValue;
				var layoutFieldValue;
				var searchFieldValue;

				//
				// Grid helper functions
				//

				function initDemo() {

						initGrid();

						// Reset field values.
						searchField.value = '';
						[sortField, filterField, layoutField].forEach(function (field) {
								field.value = field.querySelectorAll('option')[0].value;
						});

						// Set inital search query, active filter, active sort value and active layout.
						searchFieldValue = searchField.value.toLowerCase();
						filterFieldValue = filterField.value;
						sortFieldValue = sortField.value;
						layoutFieldValue = layoutField.value;

						// Search field binding.
						searchField.addEventListener('keyup', function () {
								var newSearch = searchField.value.toLowerCase();
								if (searchFieldValue !== newSearch) {
										searchFieldValue = newSearch;
										filter();
								}
						});

						// Filter, sort and layout bindings.
						filterField.addEventListener('change', filter);
						sortField.addEventListener('change', sort);
						layoutField.addEventListener('change', changeLayout);

						// Add/remove items bindings.
						addItemsElement.addEventListener('click', addItems);
						gridElement.addEventListener('click', function (e) {
								if (elementMatches(e.target, '.card-remove, .card-remove i')) {
										removeItem(e);
								}
						});

				}

				function initGrid() {

						var dragCounter = 0;

						grid = new Muuri(gridElement, {
								items: generateElements(20),
								layoutDuration: 400,
								layoutEasing: 'ease',
								dragEnabled: true,
								dragSortInterval: 50,
								dragContainer: document.body,
								dragStartPredicate: function (item, event) {
										var isDraggable = sortFieldValue === 'order';
										var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
										return isDraggable && !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
								},
								dragReleaseDuration: 400,
								dragReleseEasing: 'ease'
						})
								.on('dragStart', function () {
										++dragCounter;
										docElem.classList.add('dragging');
								})
								.on('dragEnd', function () {
										if (--dragCounter < 1) {
												docElem.classList.remove('dragging');
										}
								})
								.on('move', updateIndices)
								.on('sort', updateIndices);

				}

				function filter() {

						filterFieldValue = filterField.value;
						grid.filter(function (item) {
								var element = item.getElement();
								var isSearchMatch = !searchFieldValue ? true : (element.getAttribute('data-title') || '').toLowerCase().indexOf(searchFieldValue) > -1;
								var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
								return isSearchMatch && isFilterMatch;
						});

				}

				function sort() {

						// Do nothing if sort value did not change.
						var currentSort = sortField.value;
						if (sortFieldValue === currentSort) {
								return;
						}

						// If we are changing from "order" sorting to something else
						// let's store the drag order.
						if (sortFieldValue === 'order') {
								dragOrder = grid.getItems();
						}

						// Sort the items.
						grid.sort(
								currentSort === 'title' ? compareItemTitle :
										currentSort === 'color' ? compareItemColor :
												dragOrder
						);

						// Update indices and active sort value.
						updateIndices();
						sortFieldValue = currentSort;

				}

				function addItems() {

						// Generate new elements.
						var newElems = generateElements(5);


						// Set the display of the new elements to "none" so it will be hidden by
						// default.
						newElems.forEach(function (item) {
								item.style.display = 'none';
						});

						// Add the elements to the grid.
						var newItems = grid.add(newElems);

						// Update UI indices.
						updateIndices();

						// Sort the items only if the drag sorting is not active.
						if (sortFieldValue !== 'order') {
								grid.sort(sortFieldValue === 'title' ? compareItemTitle : compareItemColor);
								dragOrder = dragOrder.concat(newItems);
						}

						// Finally filter the items.
						filter();

				}

				function removeItem(e) {

						var elem = elementClosest(e.target, '.item');
						grid.hide(elem, {onFinish: function (items) {
										var item = items[0];
										grid.remove(item, {removeElements: true});
										if (sortFieldValue !== 'order') {
												var itemIndex = dragOrder.indexOf(item);
												if (itemIndex > -1) {
														dragOrder.splice(itemIndex, 1);
												}
										}
								}});
						updateIndices();

				}

				function changeLayout() {

						layoutFieldValue = layoutField.value;
						grid._settings.layout = {
								horizontal: false,
								alignRight: layoutFieldValue.indexOf('right') > -1,
								alignBottom: layoutFieldValue.indexOf('bottom') > -1,
								fillGaps: layoutFieldValue.indexOf('fillgaps') > -1
						};
						grid.layout();

				}

				//
				// Generic helper functions
				//

				function generateElements(amount) {
						let ret = [];

						for (var i = 0; i < amount; i++) {
								ret.push(generateElement(
										++uuid,
										generateRandomWord(2),
										getRandomItem(filterOptions),
										getRandomInt(1, 3),
										getRandomInt(1, 3)
								));
						}

						var itemElem = document.createElement('div');
						var itemTemplate = '' +
								'<div class="' + 'item h' + '2' + ' w' + '2' + ' ' + 'red' + '" data-id="' + 'Expense_Map' + '" data-color="' + 'red' + '" data-title="' + 'Expense Map' + '">' +
								'<div class="item-content">' +
								'<div class="card">' +
								'<div class="card-id">' + 'Expense_Map' + '</div>' +
								'<div class="card-title">' + 'Expense Map' + '</div>' +
								'<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
								'</div>' +
								'</div>' +
								'</div>';

						ret.push(generateElement('Expense_Map', 'Expense Map', 'red', 1, 2));

						itemElem.innerHTML = itemTemplate;

						return ret;

				}

				function generateElement(id, title, color, width, height) {

						var itemElem = document.createElement('div');
						var classNames = 'item h' + height + ' w' + width + ' ' + color;
						var itemTemplate = '' +
								'<div class="' + classNames + '" data-id="' + id + '" data-color="' + color + '" data-title="' + title + '">' +
								'<div class="item-content">' +
								'<div class="card">' +
								'<div class="card-id">' + id + '</div>' +
								'<div class="card-title">' + title + '</div>' +
								'<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
								'</div>' +
								'</div>' +
								'</div>';

						itemElem.innerHTML = itemTemplate;
						return itemElem.firstChild;

				}

				function getRandomItem(collection) {

						return collection[Math.floor(Math.random() * collection.length)];

				}

				// https://stackoverflow.com/a/7228322
				function getRandomInt(min,max) {

						return Math.floor(Math.random() * (max - min + 1) + min);

				}

				function generateRandomWord(length) {

						var ret = '';
						for (var i = 0; i < length; i++) {
								ret += getRandomItem(characters);
						}
						return ret;

				}

				function compareItemTitle(a, b) {

						var aVal = a.getElement().getAttribute('data-title') || '';
						var bVal = b.getElement().getAttribute('data-title') || '';
						return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;

				}

				function compareItemColor(a, b) {

						var aVal = a.getElement().getAttribute('data-color') || '';
						var bVal = b.getElement().getAttribute('data-color') || '';
						return aVal < bVal ? -1 : aVal > bVal ? 1 : compareItemTitle(a, b);

				}

				function updateIndices() {

						grid.getItems().forEach(function (item, i) {
								item.getElement().setAttribute('data-id', i + 1);
								item.getElement().querySelector('.card-id').innerHTML = i + 1;
						});

				}

				function elementMatches(element, selector) {

						var p = Element.prototype;
						return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);

				}

				function elementClosest(element, selector) {

						if (window.Element && !Element.prototype.closest) {
								var isMatch = elementMatches(element, selector);
								while (!isMatch && element && element !== document) {
										element = element.parentNode;
										isMatch = element && element !== document && elementMatches(element, selector);
								}
								return element && element !== document ? element : null;
						}
						else {
								return element.closest(selector);
						}

				}

				//
				// Fire it up!
				//

				initDemo();


		}
		render() {
				return (
						<header className="">
								<div className="color-bar"></div>
								<div className="content-container header">
										<div className="text-white">
												<div className="header__text">
														<h4 className="text-muted display-5">Anton Zabirko</h4>
														<h1 className="display-1">Projects</h1>
												</div>

												<section className="grid-outer">

														<h2 className="section-title"><span>Grid Demo</span></h2>

														<div className="controls cf">
																<div className="control search">
																		<div className="control-icon">
																				<i className="material-icons">&#xE8B6;</i>
																		</div>
																		<input className="control-field search-field form-control " type="text"
																		       name="search" placeholder="Search..."/>
																</div>
																<div className="control filter">
																		<div className="control-icon">
																				<i className="material-icons">&#xE152;</i>
																		</div>
																		<div className="select-arrow">
																				<i className="material-icons">&#xE313;</i>
																		</div>
																		<select className="control-field filter-field form-control">
																				<option value="" selected>All</option>
																				<option value="red">Red</option>
																				<option value="blue">Blue</option>
																				<option value="green">Green</option>
																		</select>
																</div>
																<div className="control sort">
																		<div className="control-icon">
																				<i className="material-icons">&#xE164;</i>
																		</div>
																		<div className="select-arrow">
																				<i className="material-icons">&#xE313;</i>
																		</div>
																		<select className="control-field sort-field form-control">
																				<option value="order" selected>Drag</option>
																				<option value="title">Title (drag disabled)</option>
																				<option value="color">Color (drag disabled)</option>
																		</select>
																</div>
																<div className="control layout">
																		<div className="control-icon">
																				<i className="material-icons">&#xE871;</i>
																		</div>
																		<div className="select-arrow">
																				<i className="material-icons">&#xE313;</i>
																		</div>
																		<select className="control-field layout-field form-control">
																				<option value="left-top" selected>Left Top</option>
																				<option value="left-top-fillgaps">Left Top (fill gaps)</option>
																				<option value="right-top">Right Top</option>
																				<option value="right-top-fillgaps">Right Top (fill gaps)</option>
																				<option value="left-bottom">Left Bottom</option>
																				<option value="left-bottom-fillgaps">Left Bottom (fill gaps)</option>
																				<option value="right-bottom">Right Bottom</option>
																				<option value="right-bottom-fillgaps">Right Bottom (fill gaps)</option>
																		</select>
																</div>
														</div>

														<div className="grid"></div>

														<div className="grid-footer">
																<button className="add-more-items btn btn-primary"><i
																		className="material-icons">&#xE145;</i>Add more items
																</button>
														</div>
												</section>

												<h1 className="text-muted display-5">About</h1>
												<h4 className="text-muted display-5">Brooklyn College Undergraduate</h4>
												<h4 className="text-muted display-5">Brooklyn College Undergraduate</h4>
												<h1 className="text-muted display-5">Contact</h1>
										</div>
								</div>
						</header>
				)
		}
}

export default Header;