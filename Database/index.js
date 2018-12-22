/**
 * 
 * Fancy little class that will imitate a Database/DBMS
 * Just to not feel too bored handling raw JSON :)
 * Made it as a Singleton, to make sure the dataSource is shared across the whole application and _instance is a flag to help us know if it has been initilized the first time or not.
 * For Testing, we make it not as a singleton (as a convention)
 * We add an ID attribute to make the database as real as possible.
 * 
 */
let _instance = null
class Database {
  constructor () {
    if (process.env.NODE_ENV === 'test' || !_instance) {
      const data = require('./data.json')
      this.data = data.map((item, index) => {
        item['id'] = index + 1
        return item
      })
      this.lastId = this.data.length

      _instance = this
    }
    return _instance
  }

  /* Imitate the AutoIncrement functionality of DBMS */
  getNextId () {
    this.lastId++
    return this.lastId
  }

  /* Get all the data from the (database SELECT * FROM Varieties) kinda thing */
  getAll () {
    return this.data
  }

  /* Get a variety by ID */
  findById (id) {
    return this.data.filter(item => item.id === id)
  }

  /**
   * Filter the database by the queries from the user
   * It accepts many queries at once
   * We're using AND to search
   * And to not make it to strict, we convert everything to lower case ;)
   * 
   * @param {Object} queries 
  */
  findByProps (queries) {
    const props = Object.keys(queries)
    return this.data.filter(item => {
      for (let i=0; i<props.length; i++) {
        const currentVal = item[props[i]]
        const searchedVal = queries[props[i]]
        /**
         * Situation 1: the searchable item is a String or a number
         */
        if (['number', 'string'].includes(typeof searchedVal) && ['number', 'string'].includes(typeof currentVal)) {
          if (`${currentVal}`.toLowerCase().indexOf(`${searchedVal}`.toLowerCase()) === -1) return false
        }
        /**
         * Situation 2: the searchable item is a String against an array
         */
        else if (typeof currentVal === 'object' && Array.isArray(currentVal) && typeof searchedVal === 'string') {
          const result = currentVal.filter(c => c.toLowerCase() === searchedVal.toLowerCase())
          if (result.length === 0) return false
        }
        /**
         * Situation 3: the searchable item is an array against an array
         */
        else if (typeof currentVal === 'object' && Array.isArray(currentVal) && Array.isArray(searchedVal)) {
          const A = currentVal.map(c => c.toLowerCase())
          const B = searchedVal.map(c => c.toLowerCase())
          const result = B.filter(elem => A.includes(elem))
          if (result.length === 0) return false
        }
        /**
         * Situation 5: Some other unknown type
         */
        else {
          return false
        }
      }
      return true
    })
  }

  /**
   * Create a new veriety.
   * We can add checking to not allow two varieties with the same name later... 
   * @param {Object} data 
   */
  create (data) {
    const item = { id: this.getNextId(), ...data }
    this.data.push(item)
    return item
  }

  /**
   * Updating a variety after checking if it exists
   * @param {Number} id 
   * @param {Object} data 
   */
  update (id, data) {
   const item = this.data.filter(item => item.id === id)
   if (!item.length) {
     return false
   }
   /* Cheap way to not allow ID injection or the front-end developer didn't have his morning coffee and sent it with the payload */
   delete data['id']

   const updated = {...item[0], ...data}
   this.data = this.data.map(item => {
     if (item.id === id) {
       item = updated
     }
     return item
   })
   return updated
  }

  /**
   * Deleting a variety after checking if it exists
   * @param {Number} id 
   */
  delete (id) {
    const item = this.data.filter(item => item.id === id)
    if (!item.length) {
      return false
    }
    this.data = this.data.filter(item => item.id != id)
    return id
  }

}

module.exports = Database
