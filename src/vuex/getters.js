export function isLogged (state) {
	"use strict";
	return state.userID;
}

export function isGuest (state) {
	"use strict";
	return !isLogged(state);
}