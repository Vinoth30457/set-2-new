"use strict";

// 11. Write a program that takes an array of integers and returns an array where each element is the product of all elements in the original array except the current one.
// Sample Input:   const arr = [1, 2, 3, 4];
// Sample Output:  [24, 12, 8, 6]

function productAll(arr) {
  const totalProduct = arr.reduce((acc, num) => acc * num, 1);

  const productArrayExceptCurrent = arr.map((num) => totalProduct / num);

  return productArrayExceptCurrent;
}

console.log(productAll([1, 2, 3, 4]));

// 12. Write a program that takes a start word, an end word, and a list of words, and returns the length of the shortest transformation sequence from start to end using only one letter changes at a time.
// Sample Input:   const beginWord = "hit";
//                             const endWord = "cog";
//                             const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
// Sample Output: 5

function canTransform(word1, word2) {
  if (word1.length !== word2.length) return false;
  let diffCount = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      diffCount++;
      if (diffCount > 1) return false;
    }
  }
  return diffCount === 1;
}

function shortestTransformationLength(startWord, endWord, wordList) {
  const queue = [[startWord, 1]];
  const visited = new Set([startWord]);

  while (queue.length) {
    const [currentWord, steps] = queue.shift();

    if (currentWord === endWord) {
      return steps;
    }

    for (const word of wordList) {
      if (!visited.has(word) && canTransform(currentWord, word)) {
        queue.push([word, steps + 1]);
        visited.add(word);
      }
    }
  }

  return 0;
}
const startWord = "hit";
const endWord = "cog";
const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];

const length = shortestTransformationLength(startWord, endWord, wordList);
console.log(length);

// 13. Write a program that takes a string and finds the longest palindromic substring within it.
// Sample Input:   const str = "babad";
// Sample Output: "bab" or "aba"

function longestPalindromicSubstring(s) {
  const n = s.length;
  let maxLength = 1;
  let start = 0;

  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  for (let len = 3; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        if (len > maxLength) {
          start = i;
          maxLength = len;
        }
      }
    }
  }

  return s.substr(start, maxLength);
}
const str = "babad";
const result = longestPalindromicSubstring(str);
console.log(result);

// 14. Write a program that takes a birth date as input and returns the age in days.
// Sample Input:   const birthDate = new Date('1995-10-15');
// Sample Output: 9853 days

function calculateAgeInDays(birthDate) {
  const birthDateObject = new Date(birthDate);

  const currentDate = new Date();

  const timeDifferenceInMs = currentDate - birthDateObject;

  const ageInDays = Math.floor(timeDifferenceInMs / (1000 * 60 * 60 * 24));

  return ageInDays;
}
const birthDate = "1995-10-15";
const ageInDays = calculateAgeInDays(birthDate);
console.log(ageInDays);

// 15. Write a program that takes two times (in 24-hour format) as input and returns the time difference in hours and minutes.
// Sample Input:   const time1 = "08:30";
//                             const time2 = "13:45";
// Sample Output: 5 hours and 15 minutes

function calculateTimeDifference(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);

  const [hours2, minutes2] = time2.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;
  let timeDifferenceInMinutes = Math.abs(totalMinutes2 - totalMinutes1);

  const hoursDifference = Math.floor(timeDifferenceInMinutes / 60);
  const minutesDifference = timeDifferenceInMinutes % 60;

  return { hours: hoursDifference, minutes: minutesDifference };
}
const time1 = "08:30";
const time2 = "13:45";
const timeDifference = calculateTimeDifference(time1, time2);
console.log(timeDifference);

// 16. Write a program that takes a date and a number of days as input and returns a new date after adding the specified number of days.
// Sample Input:   const date = new Date('2023-07-10');
//                             const daysToAdd = 5;
// Sample Output: "2023-07-15"

function addDaysToDate(inputDate, numberOfDays) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() + numberOfDays);
  return date;
}
const inputDate = new Date("2023-07-10");
const DaysToAdd = 5;
const newDate = addDaysToDate(inputDate, DaysToAdd);

console.log(newDate.toISOString().split("T")[0]);

// 17. Write a program that takes an object and converts it into a query string.
// Sample Input:  const obj = { name: "John", age: 30, city: "New York" };
// Sample Output: "name=John&age=30&city=New%20York"

function objectToQueryString(obj) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params.toString();
}
const obj = {
  name: "John",
  age: 30,
  city: "New York",
};

const queryString = objectToQueryString(obj);
console.log(queryString);

// 18. Write a program that takes a nested object containing numeric values and returns the sum of all values.
// Sample Input:  const obj = {
//   a: 1,
//   b: 2,
//   c: { d: 3, e: { f: 4 } }
// };
// Sample Output: 10

function sumNestedObjectValues(obj) {
  let sum = 0;

  for (const key in obj) {
    if (typeof obj[key] === "number") {
      sum += obj[key];
    } else if (typeof obj[key] === "object") {
      sum += sumNestedObjectValues(obj[key]);
    }
  }

  return sum;
}
const object = {
  a: 1,
  b: 2,
  c: { d: 3, e: { f: 4 } },
};

const totalSum = sumNestedObjectValues(object);
console.log(totalSum);

// 19. Write a program that takes a string and finds the length of the longest substring without repeating characters.
// Sample Input:  const str = "abcabcbb";
// Sample Output: 3

function longestSubstringWithoutRepeatingChars(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }

    charMap.set(char, end);
    const currentLength = end - start + 1;
    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}
const string = "abcabcbb";
const lengthOfLong = longestSubstringWithoutRepeatingChars(string);
console.log(lengthOfLong);

// 20. Write a program that takes an array of strings and groups anagrams together.
// Sample Input:  const arr = ["eat", "tea", "tan", "ate", "nat", "bat"];
// Sample Output:  [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

function groupAnagrams(strings) {
  const anagramGroups = new Map();

  for (const str of strings) {
    const key = str.split("").sort().join("");

    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
    }

    anagramGroups.get(key).push(str);
  }

  return Array.from(anagramGroups.values());
}
const inputArray = ["eat", "tea", "tan", "ate", "nat", "bat"];
const groupedAnagrams = groupAnagrams(inputArray);
console.log(groupedAnagrams);
