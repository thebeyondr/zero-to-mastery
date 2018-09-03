/* Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX. */

/*
-Split string
-If split length is 9 then rgb, if 6 then hex
-If Hex
first = (split[0] * 16) + [1]
 */

const convertBase = num => {
  return {
    from: baseFrom => {
      return {
        to: baseTo => {
          return parseInt(num, baseFrom).toString(baseTo)
        }
      }
    }
  }
}

const convertColor = color => {
  // RGB
  if (color.includes(',')) {
    let splitColor = color.split(',')
    let minMaxFilter = splitColor.filter(x => !(x >= 0 && x <= 255))
    if (minMaxFilter.length === 0) {
      let hexStr = splitColor.map(x => convertBase(x).from(10).to(16)).join('')
      return `#${color} as HEX is: #${hexStr.toUpperCase()}`
    } else {
      return 'RGB values must be greater than or equal to 0 and less than or equal to 255'
    }
  } else {
    // HEX
    let splitColor = color.split('')
    let hexValues = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'A',
      'b',
      'B',
      'c',
      'D',
      'e',
      'E',
      'f',
      'F'
    ]
    let alphaFilter = splitColor.filter(x => !(hexValues.indexOf(x) >= 0))
    if (alphaFilter.length === 0) {
      let stringGroup = [
        color.substring(0, 2),
        color.substring(2, 4),
        color.substring(4, 6)
      ]
      let rgbStr = stringGroup.map(x => convertBase(x).from(16).to(10)).join()
      return `#${color.toUpperCase()} as RGB is: (${rgbStr})`
    } else return 'All values must be either 0-9 or A-F'
  }
}
// ! For testing purposes
console.log(convertColor('192,192,192'))
console.log(convertColor('FF0000'))
