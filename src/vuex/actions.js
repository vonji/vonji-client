export const login = ({ dispatch }, username, password) => {
  dispatch('LOGIN', username, password);
}

export const logout = ({ dispatch }) => {
  dispatch('LOGOUT');
}
