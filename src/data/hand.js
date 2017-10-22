import TableCards from '@/data/table-cards.js';

let lsGetter = function(key) {
  return JSON.parse(localStorage.getItem(key));
}
let lsSetter = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default {
  get value() {
    return lsGetter('hand');
  },
  set value(value) {
    lsSetter('hand', value);
  },
  get base() {
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 22, 23, 27];
    let hand = lsGetter('hand');
    let base = hand.filter(function(id) {
        return TableCards[id].type == 'base';
    })
    return base;
  },
  get mods() {
    // return [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26];
    let hand = lsGetter('hand');
    let base = hand.filter(function(id) {
        return TableCards[id].type == 'mod';
    })
    return base;
  },
  add(value) {
    let arHand = lsGetter('hand');
    let index = arHand.indexOf(value);
    if(index == -1) {
      arHand.push(value);
      lsSetter('hand', arHand);
  	}
  },
  remove(value) {
    let arHand = lsGetter('hand');
    let index = arHand.indexOf(value);
    if(index > -1) {
      arHand.splice(index, 1);
  	}
    lsSetter('hand', arHand);
  },
  check(value) {
    let arHand = lsGetter('hand');
    let index = arHand.indexOf(value);
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