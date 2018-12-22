/**
 * 
 * Fancy little class that will imitate a Database/DBMS
 * Just to not feel too bored handling raw JSON :)
 * Made it as a Singleton, to make sure the dataSource is shared across the whole application and _instance is a flag to help us know if it has been initilized the first time or not.
 * For Testing, we make it not as a singleton (as a convention)
 * We add an ID attribute to make the database as real as possible.
 * 
 */
class Database {
  constructor() {
    if (process.env.NODE_ENV === 'test' || !Database._instance) {
      const data = require('./data.json')
      this.data = data.map((item, index) => {
        item['id'] = index + 1
        return item
      })
      this.lastId = this.data.length

      Database._instance = this
    }
    return Database._instance
  }

  /* Imitate the AutoIncrement functionality of DBMS */
  getNextId() {
    this.lastId++
    return this.lastId
  }

  /* Get all the data from the (database SELECT * FROM Varieties) kinda thing */
  getAll() {
    return this.data
  }

  /* Get a variety by ID */
  findById(id) {
    return this.data.filter(item => item.id === id)
  }

  normalize(value) {
    if (typeof value === 'object') {
      for (const key in value) {
        if (!value.hasOwnProperty(key)) continue
        value[key] = this.normalize(value[key])
      }
      return value
    } else {
      return value.toLowerCase()
    }
  }

  findByProps(filters) {
    filters = this.normalize(filters)
    return this.data.filter(item => this.matchFilters(filters, item))
  }
  matchFilters(filters, item) {
    for (const filterKey in filters) {
      if (!filters.hasOwnProperty(filterKey)) continue
      const filterValue = filters[filterKey]
      if (!this.matchKeyValue(filterKey, filterValue, item))
        return false
    }
    return true
  }

  matchString(needle, haystack) {
    haystack = `${haystack}`
    return haystack === needle || haystack.toLowerCase().includes(needle)
  }

  matchKeyValue(filterKey, filterValue, item, found = { result: false}) {
    for (const itemKey in item) {
      if (found.result) break
      if (!item.hasOwnProperty(itemKey)) continue
      const itemValue = item[itemKey]
      if (typeof itemValue === 'object') {
        if (Array.isArray(filterValue) && Array.isArray(itemValue) && typeof itemValue[0] !== 'object') {
          found.result = this.isSupersetOf(itemValue, filterValue)
        } else {
          this.matchKeyValue(filterKey, filterValue, itemValue, found)
        }
      } else if (filterKey === itemKey && this.matchString(filterValue, itemValue)) {
        found.result = true
      }
    }
    return found.result
  }

  /**
   * Create a new veriety.
   * We can add checking to not allow two varieties with the same name later... 
   * @param {Object} data 
   */
  create(data) {
    const item = {
      id: this.getNextId(),
      ...data
    }
    this.data.push(item)
    return item
  }

  /**
   * Updating a variety after checking if it exists
   * @param {Number} id 
   * @param {Object} data 
   */
  update(id, data) {
    const item = this.data.filter(item => item.id === id)
    if (!item.length) {
      return false
    }
    /* Cheap way to not allow ID injection or the front-end developer didn't have his morning coffee and sent it with the payload */
    delete data['id']

    const updated = { ...item[0],
      ...data
    }
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
  delete(id) {
    const item = this.data.filter(item => item.id === id)
    if (!item.length) {
      return false
    }
    this.data = this.data.filter(item => item.id != id)
    return id
  }

  isSupersetOf(superset, subset) {
    superset = superset.map(c => c.toLowerCase())
    if (subset.length === 0) {
      return true
    }
    if (superset.length === 0) {
      return false
    }
    return subset.every(value => superset.indexOf(value) !== -1)
  }

}

module.exports = Database
