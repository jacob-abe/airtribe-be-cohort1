# Summary Rest API 18/04/23

### What an API is?

- Wrapped functionality which can be used by other apps/clients

### Whats REST?

- Its an architecture based around resources, paths and action verbs
  built on http
- A request has headers, body and action verb
- Response has headers, status code and body(Error + Info)
- The body can be xml, json, html
- Other architectures like graphql, rpc
- Protobufs, apache thrift advantages and disadvantages
- Parts of a request and response

### Status codes

- 200
- 400
- 500

### Structure of an endpoint

- Protocol
- Domain
- Port
- Application context
- Version
- Resource
- Identifier
- Query params
- Body

### Modelling your endpoints

- Use only nouns for resources
- Plural for resources
- Get never alters state, use the right verb for the context
- Handle errors with http codes
- Sub resources for relations with query/path. Dont tightly couple individual endpoints
- Pagination/Sorting in query path or params

### Express JS

- Spawn a web server
- Easy api to add routes, handle server lifecycle
- pipe curl to jq to prettier the json
