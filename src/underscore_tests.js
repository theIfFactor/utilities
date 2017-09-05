/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return !n ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return !n?array[array.length -1]:n>array.length?array:array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {

    for(let prop in collection){
      iterator(collection[prop], prop, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(let i = 0; i < array.length; i++){
      if(array[i] == target){
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var temp = [];
    for(let prop in collection){
      if(iterator(collection[prop])){
        temp.push(collection[prop]);
      }
    }
    return temp;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var temp = [];
    for(let prop in collection){
      if(!iterator(collection[prop])){
        temp.push(collection[prop]);
      }
    }
    return temp;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let tempArr = [];
    for(let i = 0; i < array.length; i ++){
      if(tempArr.indexOf(array[i]) === -1){
        tempArr.push(array[i]);
      }
    }
    return tempArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    let tempArr = [];
    for(let i = 0; i < array.length; i ++){
      tempArr.push(iterator(array[i]));
    }
    return tempArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    let tempArr = [];
    for(let i = 0; i < array.length; i ++){
      tempArr.push(array[i][propertyName]);
    }
    return tempArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    let tempArr = [];
    for(let i = 0; i < list.length; i ++){
      typeof methodName == "string" ?
      tempArr.push(list[i][methodName](args)):
      tempArr.push(methodName.call(list[i], args));
    }
    return tempArr;
    
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    let temp = initialValue ? initialValue : 0;
    for(let prop in collection){
      temp = iterator(temp, collection[prop]);
    }
    return temp;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for(let prop in collection){
      if(collection[prop] === target){
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    for(let prop in collection){
      if(iterator){
        if(!iterator(collection[prop])){
          return false;
        }
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator ? iterator : (val)=>Boolean(val);
    for(let prop in collection){
      
        if(iterator(collection[prop])){
          return true;
        }
      
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for(let i = 1; i < arguments.length; i++){
      for(let prop in arguments[i]){
        obj[prop] = arguments[i][prop];
      }
    }
    return obj;
    
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(let i = 1; i < arguments.length; i++){
      for(let prop in arguments[i]){
        if(!obj.hasOwnProperty(prop)){
          obj[prop] = arguments[i][prop];
        }
        
      }
    }
    return obj;
    
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    let count = 0
    let answer = "";
    return function(params){
      if(count == 0){
        answer = func(params);
        count++;
      }
      return answer;
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let cache = {};
    return function(params){
      if(!cache.hasOwnProperty(params)){
        cache[params] = func(params)
      }
      return cache[params]
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    let args = [];
    for(let i =2; i < arguments.length; i++){
      args.push(arguments[i]);
    }

    return setTimeout(()=>func(...args), wait)
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    let tempArr = [];
    while(tempArr.length != array.length){
      let rando = Math.floor(Math.random()*array.length)
      if(tempArr.indexOf(array[rando]) == -1){
        tempArr.push(array[rando])
      }
    }
    return tempArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
 
    return collection.sort((a, b) => typeof iterator == "string" ? a[iterator] > b[iterator] ? 1 : -1 : iterator(a) > iterator(b) ? 1 : -1
    )
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    let tempArr = [];
    let longest = 0;
    for(let i = 0; i < arguments.length; i++){
      longest = longest < arguments[i].length ? arguments[i].length : longest
    }
    for(let i = 0; i < longest; i++){
      let temperArr = [];
      for(let j = 0; j < arguments.length; j++){
        temperArr.push(arguments[j][i]);
      }
      tempArr.push(temperArr);
    }
    return tempArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    let tempArr = result ? result : [];
    for(let i = 0; i < nestedArray.length; i++){
      typeof nestedArray[i] === "object"? _.flatten(nestedArray[i], tempArr):tempArr.push(nestedArray[i]);        
    }
    return tempArr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let tempArr = []
    for(let i = 0; i < arguments.length; i++){
      for(let j = 0; j < arguments[i].length; j++){
        let inAll = true;
        for(let k = 0; k < arguments.length; k++){
          if(arguments[k].indexOf(arguments[i][j]) == -1){
            inAll = false;
          }
        }
        if(inAll && tempArr.indexOf(arguments[i][j]) == -1){
          tempArr.push(arguments[i][j]);
        }
      }
    }
    return tempArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let tempArr = []
      for(let j = 0; j < arguments[0].length; j++){
        let inNone = true;
        for(let k = 1; k < arguments.length; k++){
          if(arguments[k].indexOf(arguments[0][j]) !== -1){
            inNone = false;
          }
        }
        if(inNone && tempArr.indexOf(arguments[0][j]) == -1){
          tempArr.push(arguments[0][j]);
        }
    }
    return tempArr;
  };

}).call(this);
