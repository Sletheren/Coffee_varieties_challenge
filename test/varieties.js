const Database = require('../src/Database')
const chaiHttp = require('chai-http')
const chai = require('chai')
const should = chai.should()

const server = require('../src/server')
let DB

chai.use(chaiHttp)

// Our parent block
describe('Varieties', () => {
  /* Initializing Our Database Before every test */
  beforeEach((done) => {
    DB = new Database()
    done()
  })

  describe('/GET Varieties', () => {
    it('should GET all the Varieties', (done) => {
      chai.request(server)
        .get('/api/varieties')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.status.should.be.a('number')
          res.body.message.should.be.eql('OK')
          res.body.data.length.should.be.eql(16)
          done()
        })
    })
    it('should GET One Variety', (done) => {
      chai.request(server)
        .get('/api/varieties/1')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('OK')
          res.body.data.length.should.be.eql(1)
          done()
        })
    })
    it('should not GET a Variety', (done) => {
      chai.request(server)
        .get('/api/varieties/17')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('OK')
          res.body.data.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('/POST Varieties', () => {
    it('Should add a variety', (done) => {
      const variety = {
        name: 'TEST',
        bean_size: 'VERY_LARGE',
        quality_potential: 'VERY_GOOD',
        yield: 'HIGH',
        disease_resistancy: [{
            leaf_rust: 'TOLERANT'
          },
          {
            coffee_berry_disease: 'RESISTANT'
          },
          {
            nematodes: 'SUSCEPTIBLE'
          }
        ],
        producing_countries: [
          'Kenia'
        ]
      }
      chai.request(server)
        .post('/api/varieties')
        .send(variety)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.status.should.be.a('number')
          res.body.message.should.be.eql('CREATED')
          res.body.data.should.have.property('id')
          res.body.data.id.should.be.eql(17)
          done()
        })
    })
  })

  describe ('/PUT Varieties', () => {
    it('Should update a variety', (done) => {
      const variety = {
        name: 'WORKS'
      }
      chai.request(server)
        .put('/api/varieties/1')
        .send(variety)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('UPDATED')
          res.body.data.should.have.property('id')
          res.body.data.id.should.be.eql(1)
          res.body.data.name.should.be.eql('WORKS')
          done()
        })
    })
  })

  describe ('/DELETE Varieties', () => {
    it('Should remove a variety', (done) => {
      chai.request(server)
        .delete('/api/varieties/1')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('DELETED')
          res.body.data.should.be.eql(1)
          done()
        })
    })
  })

  describe ('/GET Filter Varieties', () => {
    it('Should Get one variety', (done) => {
      chai.request(server)
        .get('/api/varieties?name=Bourbon')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.be.eql('OK')
          res.body.data.length.should.be.eql(1)
          done()
        })
    })
  })
})
  
