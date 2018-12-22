# Run the server
To run the server on developement (with node watching file changes) mode run the following command
```
npm run dev
```

Or to run the server on production mode, run the following command
```
npm run start
```

# API & The Supported Requests
The API will be accessible via: `/api/varieties`

### TO GET ALL VARIETIES
A GET Request to this end point
[GET] localhost:8000/api/varieties

### TO GET A VARIETY BY ID
A GET Request to this end point, `:id` is the ID of the wanted variety
[GET] localhost:8000/api/varieties/:id

### TO CREATE A VARIETY
A POST Request to this end point
[POST] localhost:8000/api/varieties
* The payload must be like:
```json
{
  "name": "Batian",
  "bean_size": "VERY_LARGE",
  "quality_potential": "VERY_GOOD",
  "yield": "HIGH",
  "disease_resistancy": [{
      "leaf_rust": "TOLERANT"
    },
    {
      "coffee_berry_disease": "RESISTANT"
    },
    {
      "nematodes": "SUSCEPTIBLE"
    }
  ],
  "producing_countries": [
    "Kenia"
  ]
}
```
### TO UPDATE A VARIETY
A PUT Request to this end point, with `:id` is the ID of the wanted variety
[PUT] localhost:8000/api/varieties/:id

* To update the name per example, the payload will look like:
```json
{
  "name": "YUMMY"
}
```
### TO REMOVE A VARIETY
A DELETE Request to this end point, `:id` is the ID of the variety to remove
[DELETE] localhost:8000/api/varieties/:id


### TO FILTER VERITIES
To filter through varieties, 
[DELETE] localhost:8000/api/varieties?query=value.....

Where the Queries can be as follows:

| Query         | Type |
| ------------ | ----------- |
| name | String |
| bean_size | String |
| quality_potential | String |
| yield | String |
| leaf_rust | String |
| coffee_berry_disease | String |
| nematodes | String |
| producing_countries | Array |


Every Query is Optional, but it has to match the expect type (because we validate the Request queries using our middleware)

## TO TEST
To run the tests, run the following command: 
```
npm run test
```



# Arabica Coffee Varieties of the World ☕️

Coffee, that liquid black gold that most developers are completely hooked on and
without it would not be able to function properly. Coffea arabica, or Arabica
coffee, is known all around the world for it great taste. Lesser known is the
fact that Arabica coffee is not just one type of bean, but that it’s a species
that has many, many varieties.

## Coding Assignment

Build a small API using Node.js and with any framework and/or tooling you feel
comfortable with. This API needs to meets the following acceptance criteria:

- It must be capable of returning a list with all varieties;
- It must be capable of returning a list filtering varieties based on any and
all of the values of any and all of their properties. Filters must be applied
using the `AND` operator;
- It must be tested;
- It must be deployable in a production environment;
- It must be documented. From the documentation it must be clear how to run
and use the API as well as explain why your implementation is most favorable.

Included is a very small boilerplate. You can use this (or not) to get started.
