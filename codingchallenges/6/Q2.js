/* Question 2: Write a javascript function that takes an array of numbers and a target number. The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3] */

const targetSum = (arr, target) => {
  let doneValues = []
  let pairArr = []
  arr.forEach(val => {
    let tempArr = []
    let pairVal = target - val
    if (
      val !== pairVal &&
      arr.includes(pairVal) &&
      !(doneValues.includes(val) && doneValues.includes(pairVal))
    ) {
      if (!(tempArr.indexOf(pairVal) > -1)) {
        let newItems = [val, pairVal]
        tempArr.push(...newItems)
        pairArr.push(tempArr)
        doneValues.push(...newItems)
      }
    }
  })
  return pairArr
}
const testArr = [1, 2, 3, 1]
console.log(`Pairs: `, targetSum(testArr, 4)) // ! For testing purposes
