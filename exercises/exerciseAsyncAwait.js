// Solve the below problems:
const fetch = window.fetch
// #1) Convert the below promise into async await
// fetch('https://swapi.co/api/starships/9/')
//   .then(response => response.json())
//   .then(console.log)

const getStarships = async function () {
  let response = await fetch('https://swapi.co/api/starships/9/')
  const starships = await response.json()
  console.log(starships)
}

getStarships()

// #2) ADVANCED: Update the function below from the video to also have
// async await for this line: fetch(url).then(resp => resp.json())
// So there shouldn't be any .then() calls anymore!
// Don't get discouraged... this is a really tough one...
const urls = [
  'https://jsonplaceholder.typcode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

const fetchURLData = async function (url) {
  const resp = await fetch(url)
  const data = await resp.json()
  return data
}

const getData = async function () {
  const [users, posts, albums] = await Promise.all(
    urls.map(url => fetchURLData(url))
  )
  console.log('users', users)
  console.log('posts', posts)
  console.log('albums', albums)
}

getData()

// #3) Add a try catch block to the #2 solution in order to catch any errors.
// Now chnage one of the urls so you console.log your error with 'ooooooops'

const getData2 = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(url => fetchURLData(url))
    )
    console.log('users', users)
    console.log('posts', posts)
    console.log('albums', albums)
  } catch (err) {
    console.log('error: ', err)
  }
}

getData2()
