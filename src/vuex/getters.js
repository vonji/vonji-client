export function isLogged (state) {
	return state.userID;
}

export function isGuest (state) {
	return !isLogged(state);
}

export function currentUser(state) {
	return state.user;
}

export function achievementList(state) {
	return state.achievementList;
}