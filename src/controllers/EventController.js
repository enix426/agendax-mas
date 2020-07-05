/**
 * @module EventController
 */

import Controller from "./Controller";
import EditEventPage from "../pages/EditEventPage";
import EventsPage from "../pages/EventsPage";

export default class EventController extends Controller {

	constructor() {
		// sa appelle les constructor de l'ancetre
		super();
	}

	/*
	* process les appels de pages
	*/
	process() {
		const RE_EVENT = /^\/event\/?$/gi;
		const RE_EVENT_ID = /^\/event\/(\d+)$/gi;
		let res = null; // Promesse de chargement du controleur 
		if (window.location.pathname.match(RE_EVENT)) {
			res = this.events();
		} else if (window.location.pathname.match(RE_EVENT_ID)) {
			let eventId = RE_EVENT_ID.exec(window.location.pathname)[1];
			res = this.editEvent(eventId);
		} else {
			// throw new Error("Invalid path in EventController");
			res = this.events();
		}
		return res;
	}

	/*
	* Gere les evenements
	*/
	events() {
		const URL_EVENTS = 'http://agendax-mas.api/event';
		console.log("Fetching events");
		return fetch(URL_EVENTS)
			.then(response => response.json())
			.then(respData => {
				console.log("Events fetched");
				this.data = respData;
				this._page = new EventsPage({
					events: respData,
				});
			});
	}

	/*
	* Gere les evenements
	*/
	editEvent(eventId) {
		const URL_EVENT_ID = 'http://agendax-mas.api/event/' + eventId;
		console.log(`Fetching event n°${eventId}`);
		return fetch(URL_EVENT_ID)
			.then(response => response.json())
			.then(respData => {
				console.log(`Event n°${eventId} fetched`, respData);
				this.data = respData;
				this._page = new EditEventPage(eventId, {
					event: respData[0],
				}
				);
			});
	}
}
