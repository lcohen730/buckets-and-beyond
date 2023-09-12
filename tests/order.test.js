const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app-server')
const server = app.listen(8040, () => console.log(`8040 ORDER TEST`))
const Order = require('../models/order')
const User = require('../models/user')
const Item = require('../models/item')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the order endpoints', () => {
    test('It should add an item to the cart', async () => {
        const user = new User({ guest: true })
        await user.save()
        const token = await user.createJWT()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const response = await request(app)
            .post(`/api/orders/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.total).toEqual(100)
    })
    test('It should add an item to the cart that is already in the cart.', async () => {
        const user = new User({ guest: true })
        await user.save()
        const token = await user.createJWT()
        const order = new Order({ user: user._id })
        await order.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const cart = order.getCart(user._id)
        cart.lineItems = [{ item: item }]
        await cart.save()
        const response = await request(app)
            .post(`/api/orders/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.total).toBe(200)
        expect.objectContaining(cart)
    })
    test('It should display items in the cart and the total', async () => {
        const user = new User({ guest: true })
        await user.save()
        const token = await user.createJWT()
        const order = new Order({ user: user._id })
        await order.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const cart = order.getCart(user._id)
        cart.lineItems = ([{ item: item }])
        await cart.save()
        const response = await request(app)
            .get(`/api/orders/cart`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.total).toEqual(100)
        expect.objectContaining(cart)
    })
    test('It should change item quantity', async () => {
        const user = new User({ guest: true })
        await user.save()
        const token = await user.createJWT()
        const order = new Order({ user: user._id })
        await order.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const cart = order.getCart(user._id)
        cart.lineItems = [{ item: item._id }]
        const response = await request(app)
            .put(`/api/orders/cart/qty`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({item: item._id, quantity: 3 })
        expect(response.statusCode).toBe(200)
        expect(response.body.total).toEqual(300)
        expect.objectContaining(cart)
    })
    test('It should delete an item from the cart', async () => {
        const user = new User({ guest: true })
        const token = await user.createJWT()
        await user.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const order = new Order({user: user._id})
        const cart = order.getCart(user._id)
        cart.lineItems = ([{ item: item }])
        await cart.save()
        const response = await request(app)
            .put(`/api/orders/cart/qty`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ item: item._id, qty: 0 })
        expect(response.statusCode).toBe(200)
        expect(response.body.total).toEqual(0)
        expect.objectContaining(cart)
    })
    test('It should check out the cart', async() => {
        const user = new User({ guest: true })
        const token = await user.createJWT()
        await user.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const order = new Order({user: user._id})
        const cart = order.getCart(user._id)
        cart.lineItems = ([{ item: item }])
        await cart.save()
        const response = await request(app)
            .post(`/api/orders/cart/checkout`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(100)
        expect(response.body.cart.total).toBe(100)
        expect.objectContaining(cart)
    })
    test('It should show paid carts', async() => {
        const user = new User({ guest: true })
        await user.save()
        const token = await user.createJWT()
        const order = new Order({ user: user._id })
        await order.save()
        const item = new Item({ name: 'test', description: 'test', price: 100, searchTerm: ['test'], price: 100 })
        await item.save()
        const cart = order.getCart(user._id)
        cart.lineItems = ([{ item: item }])
        cart.isPaid = true
        await cart.save()
        const response = await request(app)
            .get(`/api/orders/history`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(cart)
    })
})