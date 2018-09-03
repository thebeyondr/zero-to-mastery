// Solve the questions below:

// #1) Create a promise that resolves in 4 seconds and returns "success" string
const success = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'Success!')
})
success.then(msg => console.log(msg))

// #2) Run the above promise and make it console.log "success"

// #3) Read about Promise.resolve() and Promise.reject(). How can you make
// the above promise shorter with Promise.resolve() and console loggin "success"
const success2 = Promise.resolve('Success')
success2.then(msg => console.log(msg))

// #4) Catch this error and console log 'Ooops something went wrong'
const rejPromise = Promise.reject(new Error('failed'))
rejPromise.catch(err => console.log(err))

// #5) Use Promise.all to fetch all of these people from Star Wars (SWAPI) at the same time.
// Console.log the output and make sure it has a catch block as well.
const urls = [
  'https://swapi.co/api/people/1',
  'https://swapi.co/api/people/2',
  'https://swapi.co/api/people/3',
  'https://swapi.co/api/people/4'
]

Promise.all(
  urls.map(url => {
    return window.fetch(url).then(resp => resp.json())
  })
)
  .then(results => {
    console.log(results[0])
    console.log(results[1])
    console.log(results[2])
  })
  .catch(err => console.log(err))

// #6) Change one of your urls above to make it incorrect and fail the promise
// does your catch block handle it?
