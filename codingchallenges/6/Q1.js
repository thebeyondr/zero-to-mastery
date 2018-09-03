/* Question 1:
Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]] */

// Sorts numeric array
const sortNumericArrayAsc = x => x.sort((a, b) => a - b)

// Checks if an array is in an array
const isArrayinArray = (arr, item) => {
  let itemAsString = JSON.stringify(item)
  const contains = arr.some(el => {
    return JSON.stringify(el) === itemAsString
  })
  return contains
}

// Cleans a sorted numeric array
const cleanArray = arr => {
  let orderedArr = null
  const arrtype = typeof arr[0]
  arrtype === 'number'
    ? (orderedArr = sortNumericArrayAsc(arr))
    : (orderedArr = arr.sort())

  // Groups each element into filtered arrays
  let nextArr = orderedArr.map((x, i) => {
    let filteredArr = arr.filter(n => n === x)
    let item = arrtype === 'number'
      ? filteredArr.length > 1 ? filteredArr : x
      : x
    return item
  })

  // Removes duplicate filtered groups and adds other numbers
  let returnArr = []
  nextArr.forEach(el => {
    if (Array.isArray(el)) {
      if (!isArrayinArray(returnArr, el)) {
        returnArr.push(el)
      }
    } else if (!returnArr.includes(el)) {
      returnArr.push(el)
    }
  })
  return returnArr
}

let testArray = [1, 2, 4, 591, 392, 391, '2', 5, 10, '2', 1, 1, '1', 20, 20]
let stringArray = testArray.filter(x => typeof x === 'string')
let numberArray = testArray.filter(x => typeof x === 'number')
let cleanedNumArray = cleanArray(numberArray)
let cleanedStringArray = cleanArray(stringArray)
let cleanedArray = cleanedNumArray.concat(cleanedStringArray)

console.log(cleanedArray) // ! For testing purposes
