### Run the server
To run the server on developement (with node watching file changes) mode run the following command
```
npm run dev
```

Or to run the server on production mode, run the following command
```
npm run start
```

### API & The Supported Requests
The API will be accessible via: `/api/varieties`


### Live demo:
You can test the API in real time, by accessing this URL:

```http
https://lit-bayou-77243.herokuapp.com/api/varieties
```
____

### Operations & Requests

Different type of possible requests

#### `Create new variety`

**Endpoint:**
```http
POST http://localhost:8080/api/varieties
```
**Request payload:**
* **Body:**
  * `name`: the name of coffe variety, must be of string type, optional
  * `bean_size`: the bean size of coffe variety, must be of string type, optional
  * `quality_potential`: the quality potential of coffe variety, must be of string type, optional
  * `yield`: the yield of coffe variety, must be of string type, optional
  * `disease_resistancy`: an array of objects:
    * `{key}`: the disease name key, must be of string type
    * `{value}`: the disease resistancy value, must be of string type, accepts either `TOLERANT`, `RESISTANT`, `SUSCEPTIBLE`

  * `producing_countries`: an array of countries:
    * `{country}`: the country name, must be of string type

**Response:**
* **Headers:** ...
* **Body:**
	* `status`: 200
    * `message`: "CREATED"
    * `data`: ...

**Example request:**
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

____

#### `Filter varieties`

**Endpoint:**
```http
GET http://localhost:8080/api/varieties
```
**Request payload:**
* **Query parameters:**
  * `name`: the name of coffe variety, must be of string type, optional
  * `bean_size`: the bean size of coffe variety, must be of string type, optional
  * `quality_potential`: the quality potential of coffe variety, must be of string type, optional
  * `yield`: the yield of coffe variety, must be of string type, optional
  * A key-value association of, optional:
    * `{key}`: the disease name key, must be of string type
    * `{value}`: the disease resistancy value, must be of string type, accepts either `TOLERANT`, `RESISTANT`, `SUSCEPTIBLE`

  * `producing_countries`: an array of countries, optional:
    * `{country}`: the country name, must be of string type

**Response:**
* **Headers:** ...
* **Body:**
	* `status`: 200
    * `message`: "OK"
    * `data`: a collection of coffee varieties that match the filters

**Example request:**
```http
http://localhost:8080/api/varieties?name=Batian&bean_size=VERY_LARGE
```

____

#### `Get a variety by ID`

**Endpoint:**
```http
GET http://localhost:8080/api/varieties/:id
```
**Request payload:**
* `:id`: the id of the variety (Number)

**Response:**
* **Headers:** ...
* **Body:**
	* `status`: 200
    * `message`: "OK"
    * `data`: ...


____

#### `Update a variety by its ID`

**Endpoint:**
```http
PUT http://localhost:8080/api/varieties/:id
```
**Request payload:**
* `:id`: the id of the variety
* **Body:**
  * `name`: the name of coffe variety, must be of string type, optional
  * `bean_size`: the bean size of coffe variety, must be of string type, optional
  * `quality_potential`: the quality potential of coffe variety, must be of string type, optional
  * `yield`: the yield of coffe variety, must be of string type, optional
  * `disease_resistancy`: an array of objects:
    * `{key}`: the disease name key, must be of string type
    * `{value}`: the disease resistancy value, must be of string type, accepts either `TOLERANT`, `RESISTANT`, `SUSCEPTIBLE`

  * `producing_countries`: an array of countries:
    * `{country}`: the country name, must be of string type

**Response:**
* **Headers:** ...
* **Body:**
	* `status`: 200
    * `message`: "UPDATED"
    * `data`: ...

____

#### `Delete a variety by its ID`

**Endpoint:**
```http
DELETE http://localhost:8080/api/varieties/:id
```
**Request payload:**
* `:id`: the id of the variety

**Response:**
* **Headers:** ...
* **Body:**
	* `status`: 200
    * `message`: "DELETED"
    * `data`: ...


____

### Request errors

#### Examples of error responses:


| Status Code | Message | Description |
| ------------ | ----------- | ----------- |
| 404 | NOT_FOUND | The ressource doesn't exist |
| 500 | SERVER_ERROR | Generic Server error |
| 400 | INVALID_REQUEST | The request/The request data aren't valid |
| 400 | FAILED | The operation has been failed |
| 400 | UPDATE_FAILD | The update has been failed |
| 400 | DELETE_FAILD | The delete has been failed |



### TO TEST
To run the tests, run the following command: 
```
npm run test
```


### Continuous Integration
I envisioned the app to have the continious Integration with (Travis CI) to make the build pipeline and deploy to heroku 
The build pipeline consists of running a set of tests using Mocha/Chai and then a round of Linting using esLint

### Enjoy :D






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
