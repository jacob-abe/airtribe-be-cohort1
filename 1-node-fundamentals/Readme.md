# Summary NodeJS Fundamentals 15/04/23

### What is Node?

- Its a JS runtime
- Non Blocking
- Single threaded

### Use cases of Node

- I/O Bound apps
- Data streaming
- File handling
  Basically anything that does not require a bunch of CPU

### Blocking and Non blocking

- Postman story:
  Blocking: Wait for post to arrive before you continue with life
  Non Blocking: Ask the postman to give you a call for confirmation and go about your life
- Promise syntax

### Node package manager

- npm init //to intitialise a project
- npm install //to install all dependencies of a project
- npm install --save <package-name> // --save applied by default
- What package.json is: Its a human readable config for project with dependencies and info about scripts and project
- What node_modules folder is: Its a folder with pulled packages that are needed for your project // Not to be checked into repos

### Coding session: (Blocking and unblocking code with fs)

To move file data from input folder to output folder
4 Scenarios:

1. Read sync write async
2. Read sync write sync
3. Read async write sync
4. Read async write async

### Using chrome devtools

1. Cmd: node --inspect-brk
2. Head over to chrome -> chrome://inspect
