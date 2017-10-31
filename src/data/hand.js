import TableCards from '@/data/table-cards.js';

let lsGetter = function(key) {
  return JSON.parse(localStorage.getItem(key));
}
let lsArrayGetter = function(key) {
  return lsGetter(key) || [];
}

let lsSetter = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
let lsArraySetter = function(key, value) {
  if(!typeof(value.forEach === 'function')) {
    return false;
  }
  let newValue = [];
  value.forEach(function(elem) {
    if(!isNaN(parseInt(elem))) {
      newValue.push(parseInt(elem));
    }
  });
  lsSetter(key, newValue);
}

export default {
  get value() {
    return lsArrayGetter('hand');
  },
  set value(value) {
    lsArraySetter('hand', value);
  },
  get base() {
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 22, 23, 27];
    let hand = lsArrayGetter('hand');
    let base = hand.filter(function(id) {
        return TableCards[id].type == 'base';
    })
    return base;
  },
  get mods() {
    // return [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26];
    let hand = lsArrayGetter('hand');
    let base = hand.filter(function(id) {
        return TableCards[id].type == 'mod';
    })
    return base;
  },
  add(value) {
    let arHand = lsArrayGetter('hand');
    let index = arHand.indexOf(parseInt(value));
    if(index == -1) {
      arHand.push(value);
      lsArraySetter('hand', arHand);
  	}
  },
  remove(value) {
    let arHand = lsArrayGetter('hand');
    let index = arHand.indexOf(parseInt(value));
    if(index > -1) {
      arHand.splice(index, 1);
  	}
    lsArraySetter('hand', arHand);
  },
  check(value) {
    let arHand = lsArrayGetter('hand');
    let index = arHand.indexOf(parseInt(value));
    if(index != -1) {
      return true;
    } else {
      return false;
    }
  },
  // set base(value) {
  //   lsSetter('handBase', value);
  // },
  // set mods(value) {
  //   lsSetter('handMods', value);
  // }
};