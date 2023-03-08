import express from "express";
import path from 'path'
import bodyParser from "body-parser";
import {User, Purchase, Course} from '../model/index.js'
import { Router } from "express";

// code to fix error: __dirname is not defined
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const route = Router();

// create all instances
const user = new User();
const course = new Course();
const purchase = new Purchase();

// route to the home page
route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'))
});

// user routes==============================================
// login
route.post('/user', bodyParser.json(), (req, res) => {
    user.login(req,res);
})

// get all users
route.get('/users', (req, res)=>{
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
route.post('/item', bodyParser.json(), (req, res)=> {
    course.addCourse(req, res);
});

// Update a course
route.put('/item/:id', bodyParser.json(), (req, res)=> {
    course.updateCourse(req, res);
});

// Delete a product
route.delete('/item/:id', (req, res)=> {
    course.deleteCourse(req, res);
});

// purchase routes==============================================
// Fetch all purchases
route.get('/purchases', (req, res)=> {
    purchase.fetchPurchases(req, res);
});

// Fetch a single purchase
route.get('/purchase/:id', (req, res) => {
    purchase.fetchPurchase(req, res);
});

// Add a new purchase
route.post('/purchases', bodyParser.json(), (req, res)=> {
    purchase.createPurchase(req, res);
});

export default route;



