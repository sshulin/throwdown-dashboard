let lsGetter = function(key) {
  return JSON.parse(localStorage.getItem(key));
}
let lsSetter = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default {
  get base() {
	// return [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 22, 23, 27];
    return lsGetter('handBase');
  },
  set base(value) {
  	lsSetter('handBase', value);
  },
  get mods() {
	// return [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26];
  	return lsGetter('handMods');
  },
  set mods(value) {
  	lsSetter('handMods', value);
  }
};