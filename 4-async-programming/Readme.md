# Deep dive into Async code 22-04-23

## Callbacks

- Passing function to a function that sends execution to nested function
- Promises can be a callback as well, they can have 2 outcomes: Rejected/Resolved
- Callbacks work with stacks, top gets executed first
- Async await is a sync code wrapping Promises

## Airquality project

- Define routes
- Define controllers, handle logic here
- Controllers written with both callback/promises/async await
- Callback hell
  - Happens on dependent calls, error handling is so hard
- Async await is perfect to handle this
- Parallel calls with Promise.all
