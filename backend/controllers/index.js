import express from "express";
import path from 'path'
import bodyParser from "body-parser";
import {User, Cart, Course} from '../model/index.js'
import { Router } from "express";
// import verifyAToken from '../middleware/AuthenticatedUser.js'

// code to fix error: __dirname is not defined
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const route = Router();

// create all instances
const user = new User();
const cart = new Cart();
const course = new Course();

// route to the home page
route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'));
});

// user routes==============================================
// login
route.post('/user', bodyParser.json(), (req, res) => {
    user.login(req,res);
})

// get all users
route.get('/users', /*verifyAToken,*/ (req, res)=>{
    user.fetchUsers(req, res);
});

// get a user
route.get('/user/:id', (req, res)=>{
    user.fetchUser(req, res);
});

// Update a user
route.put('/user/:id',bodyParser.json(), (req, res)=>{
    user.updateUser(req, res);
});

// toggle admin state
route.put('/admin/:id',bodyParser.json(), (req, res)=>{
    user.toggleAdminState(req, res);
});

// Register a user
route.post('/register', bodyParser.json(), (req, res)=> {
    user.createUser(req, res);
})

// Delete a user
route.delete('/user/:id', (req, res)=>{
    user.deleteUser(req, res);
});

// course routes===============================================
// fetch all courses
route.get('/items', (req, res)=> {
    course.fetchCourses(req, res);
});

// Fetch a single course
route.get('/item/:id', (req, res) => {
    course.fetchCourse(req, res);
});

// Add a new course
route.post('/items', bodyParser.json(), (req, res)=> {
    course.addCourse(req, res);
});

// Update a course
route.put('/item/:id', bodyParser.json(), (req, res)=> {
    course.updateCourse(req, res);
});


// Delete a course
route.delete('/item/:id', (req, res)=> {
    course.deleteCourse(req, res);
});

// cart routes==============================================
// Add a new item to the cart purchase
route.post('/user/:id/cart', bodyParser.json(), (req, res)=> {
    cart.addToCart(req, res);
});

// get all the cart items for a specified user
route.get('/user/:id/carts', bodyParser.json(), (req, res) => {
    cart.fetchCart(req, res);
});

// update a specified cart for a specified user
route.put('/user/:uid/cart/:cid', bodyParser.json(), (req, res) => {
    cart.updateCart(req, res);
});


// update a specified cart for a specified user
route.put('/user/:id/cart', bodyParser.json(), (req, res) => {
    cart.updateAllCartItems(req, res);
});




// delete all carts for a specified user
route.delete('/user/:id/cart', (req,res) => {
    cart.deleteCartItems(req, res);
});

// delete all carts for a specified user
route.delete('/user/:uid/cart/:cid', (req,res) => {
    cart.deleteCartItem(req, res);
});

export default route;



