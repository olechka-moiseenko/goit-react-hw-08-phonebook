const getIsLoggedIn = (state) => state.authSlice.isLoggedIn;

const getUsername = (state) => state.authSlice.user.name;

const getIsFetchingCurrent = (state) => state.authSlice.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getIsFetchingCurrent,
};
export default authSelectors;
