/* eslint-disable no-unused-vars */
export default ({ store, app: { $axios } }) => {
  $axios.defaults.withCredentials = true;
};
