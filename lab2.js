/*********************************************************
LAB 2: SORTING AND CAMPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

//Keeping individual segments outside of the global space
(function() {

function Blob() {
  this.peopleConsumed = 0;
  this.hoursAlive = 0;
}

var blob = new Blob();

//While there are still people in the town
while (blob.peopleConsumed < 1000)
{
  //Eat at our rate of consumption
  blob.peopleConsumed += (blob.peopleConsumed + 1);
  blob.hoursAlive++;
}

var hoursSpentInDowington = blob.hoursAlive;
                           // TODO: assign me the value of the
                           // above calculation
// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above. Be sure to then assign me to the Blob's prototype.
  if (peoplePerHour <= 0)
  {
    return Infinity;
  }

  var peopleConsumed = 0, hours = 0;
  while (peopleConsumed < population)
  {
    peopleConsumed += peoplePerHour;
    peoplePerHour += peoplePerHour;
    hours++;
  }
  return hours;
}
Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(1000, 1000) === 1, "should take one hour when population equals people per hour");
assert(blob.hoursToOoze(1, 0) === Infinity, "the blob will be unable to finish if it cannot consume people");
assert(blob.hoursToOoze(1, -1) === Infinity, "the blob will be unable to finish if it actually CREATES people");

})(); //End of this section!

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

(function() {

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (home, lang) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = home;
  this.language = lang;
}

// sb is a SentientBeing object
function sayHello (sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    console.log(hello[this.language]);
    return hello[sb.language];
    //TODO: put this on the SentientBeing prototype
  }
SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
function Human() {}
Human.prototype = new SentientBeing("Earth", "federation standard");

function Klingon() {}
Klingon.prototype = new SentientBeing("Qo\"noS", "klingon");

function Romulan() {}
Romulan.prototype = new SentientBeing("Romulus", "romulan");

assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");

assert((new Klingon()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Klingon()).sayHello(new Human()) === "hello",
  "the human should hear hello");

assert((new Romulan()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
assert((new Romulan()).sayHello(new Human()) === "hello",
  "the human should hear hello");

})();//End of this section!

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one
//*********************************************************
function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // read this: http://www.w3schools.com/jsref/jsref_sort.asp
    return a.slice(-1).toLowerCase().localeCompare(b.slice(-1).toLowerCase());
    //localeCompare returns -1 if a should go first, 0 if they're the same, and 1 if b should go first.
  }
  stringArray.sort(byLastLetter);
}

//Testing!
(function() {
var array1 = [ "apple", "banana", "pear", "mountain", "john", "paul", "george", "ringo" ];
lastLetterSort(array1);
var array2 = [ "a", "a", "z", "z", "az", "za", "ZA", "AZ", "ZZZ", "AAA", "b", "a", "q",
              "SFLKS", "jgfkjewoi", "for", "the", "love", "of", "god", "montressor" ];
lastLetterSort(array2);

function isArrayLastLetterSorted(stringArray) {
  if (stringArray.length <= 1)
  {
    return true;
  }

  for (var i = 1; i < stringArray.length; ++i)
  {
    //If any element's last character is less than the last character of the element preceding it
    if (stringArray[i].slice(-1).toLowerCase() < stringArray[i - 1].slice(-1).toLowerCase())
    {
      return false;
    }
  }
  return true;
}
assert(isArrayLastLetterSorted(array1), "the first test array was not properly sorted.");
assert(isArrayLastLetterSorted(array2), "the second test array was not properly sorted.");
})();

//*********************************************************

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(currVal) {sum += currVal;});
  return sum;
}

//Testing!
(function() {
var array1 = [ 1, 2, 3, -1 ];
var mySum1 = sumArray(array1);

var array2 = [ 1, -1, 400, -399, -1 ];
var mySum2 = sumArray(array2);

var array3 = [ 0 ];
var mySum3 = sumArray(array3);

assert(mySum1 === 5,  "sumArray didn't correctly sum the first test array.");
assert(mySum2 === 0,  "sumArray didn't correctly sum the second test array.");
assert(mySum3 === 0,  "sumArray didn't correctly sum the third test array.");
})();

//*********************************************************

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(item1, item2) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    var sum1 = sumArray(item1);
    var sum2 = sumArray(item2);
    //Sort from lowest to highest.
    if (sum1 < sum2)
    {
      return -1;
    }
    if (sum1 > sum2)
    {
      return 1;
    }
    return 0;
  });
}

//Testing!
(function() {
var arrayArray1 = [ [ 1, 2, 3 ], [ -20, -1, -4 ], [ 500, 1, 2 ] ];
sumSort(arrayArray1);
var arrayArray2 = [ [ 0, 0, 0 ], [ -10000, -20, 5000 ], [ 90, -240, 1 ] ];
sumSort(arrayArray2);

function isArrayArraySumSorted(arrayOfArrays) {
  if (arrayOfArrays.length <= 1)
  {
    return true;
  }

  for (var i = 1; i < arrayOfArrays.length; ++i)
  {
    if (sumArray(arrayOfArrays[i]) < sumArray(arrayOfArrays[i - 1]))
    {
      return false;
    }
  }
  return true;
}

assert(isArrayArraySumSorted(arrayArray1), "the first array of arrays was not properly sum sorted");
assert(isArrayArraySumSorted(arrayArray2), "the second array of arrays was not properly sum sorted");
})();
//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
//I did those things! Is it okay if we customize jscs? (I'll probably just ask you this)
