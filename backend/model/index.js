// database configuration
import db from '../config/index.js'

// bcrypt module to hash password
import {hash, compare, hashSync, genSaltSync} from 'bcrypt'

// middleware for creating a token
import createToken from '../middleware/AuthenticatedUser.js'
import verifyAToken from '../middleware/AuthenticatedUser.js'

// create and export a class for Users
export class User {
    // login
    login(req, res){
        const {email, user_password} = req.body;
        const qryStr = `
            SELECT user_id, firstname, lastname, gender, user_role, email, user_password, profile_image
            FROM Users
            WHERE email = '${email}';
        `;
        db.query(qryStr, async (err, data) => {
            console.log(data);
            if (err) throw err;
            if ((!data.length) || (data == null)) {
                res.status(401).json({
                    err: 'Incorrect email address.'
                })
            }
            else {
                await compare(user_password, data[0].user_password, (_err, _result) => {
                    if (_err) throw _err;
                    // create a jw token
                    const jwToken = createToken({
                        email, user_password
                    });

                    // saving 
                    res.cookie('LegitUser', jwToken, {
                        maxAge: 3600000,
                        httpOnly: true
                    });

                    if(_result) {
                        res.status(200).json({
                            msg: 'Logged in',
                            jwToken,
                            result: data[0]
                        });
                    }
                    else {
                        res.status(401).json({
                            err: 'You entered an invalid password or did not register.'
                        })
                    };
                })
            }
        });
    }
    
    // register using async
    async createUser(req, res) {
        // payload: data from the user
        let detail = req.body;
        console.log(detail);

        // hashing the password
        // let salt = genSaltSync(15);
        // console.log(detail.user_password);
        detail.user_password = await hash(detail.user_password, 15);

        // this information will be used for user authentication
        let user = {
            email: detail.email,
            user_password: detail.user_password
        }

        // sql query
        const qryStr = 'INSERT INTO Users SET ?;';
        db.query(qryStr, [detail], (err) => {
            if (err) {
                res.status(401).json({err});
                return;
            }
            const jwToken = createToken(user);
            // This token will be saved in the cookie.
            // duration in milliseconds
            res.cookie('LegitUser', jwToken, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.status(200).json({msg: 'User record is saved.'});
        }) 
    }

    // delete user
    deleteUser(req, res) {
        const qryStr = `
            DELETE FROM Users
            WHERE user_id = ?;`
        db.query(qryStr, [req.params.id], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: 'User record has been removed successfully.'
            });
        });
    }

    // fetch all users
    fetchUsers(req,res) {
        const qryStr = `
        SELECT user_id, firstname, lastname, gender, user_role, email, profile_image
        FROM Users;`;

        db.query(qryStr, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                results: data
            });
        });
    }

    // fetch a single user
    fetchUser(req,res) {
        const qryStr = `
        SELECT user_id, firstname, lastname, gender, user_role, email, profile_image
        FROM Users
        WHERE user_id = ?`;

        db.query(qryStr, [req.params.id], (err, data) => {
            if (err) throw err;
            res.status(200).json({
                results: data
            });
        });
    }

    // update a user
    updateUser(req, res) {
        let data = req.body;
        console.log(data);

        if((data.user_password !== null) || (data.user_password !== undefined)){
            data.user_password = hashSync(data.user_password, 15);
        }
        
        const qryStr = `
            UPDATE Users
            SET ?
            WHERE user_id = ?;`

        db.query(qryStr, [data, req.params.id], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: "User record has been updated."
            });
        });

    }
}

// create a class for Courses
export class Course {
    // fetch all courses
    fetchCourses(req, res) {
        const qryStr = `
            SELECT course_id, title, category, course_description, price, image_link
            FROM Courses;`;
        db.query(qryStr, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                results: data
            });
        })
    }

    // fetch a single vehicle
    fetchCourse(req, res) {
        const qryStr = `
            SELECT course_id, title, category, course_description, price, image_link
            FROM Courses
            WHERE course_id = ?;`;
        db.query(qryStr, [req.params.id], (err, data ) => {
            if (err) throw err;
            res.status(200).json({
                results: data
            });
        });
        
    }

    // add a course
    async addCourse(req, res) {
        // payload: data from the user
        let detail = req.body;
        console.log(detail);

        const qryStr = `INSERT INTO Courses SET ?;`;
        db.query(qryStr, [detail], (err) => {
            if (err) {
                res.status(401).json({err});
                return;
            }
            res.status(200).json({msg: 'Course record has been saved.'});
        });
    }

    // update Course details
     updateCourse(req, res) {
        let data = req.body;
        const qryStr = `
            UPDATE Courses
            SET ?
            WHERE course_id = ?;`

        db.query(qryStr, [data, req.params.id], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: "Course record has been updated."
            });
        });
    }

    // delete a course
    deleteCourse(req, res) {
        const qryStr = `
        DELETE FROM Courses
        WHERE course_id = ?;`

    db.query(qryStr, [req.params.id], (err) => {
        if (err) throw err;
        res.status(200).json({
            msg: 'Course record has been removed successfully.'
        });
    });  
    }
}

export class Cart {
    // add an item to the cart
    async addToCart(req, res) {
        // payload: data from the user
        let detail = req.body;
        detail.user_id = req.params.id;
        console.log('start');
        console.log(detail);
        console.log('end');
        const qryStr = `INSERT INTO Cart SET ?`
        db.query(qryStr, [detail], (err) => {
            if (err) {
                res.status(401).json({err});
                return;
            }
            res.status(200).json({msg: 'Cart record has been saved.'});
        });
    }
    
    // update a specified cart for a specified user (using cart_id and user_id)
    updateCart(req, res) {
        let data = req.body;
        const qryStr = `
            UPDATE Cart
            SET ?
            WHERE (user_id = ?) AND (cart_id = ?);`

        db.query(qryStr, [data, req.params.uid, req.params.cid], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: "Cart record has been updated."
            });
        });
    }

    // fetch all items in the cart for a specific user
    fetchCart(req,res) {
        const qryStr = `
            SELECT cr.user_id, cr.cart_id, cr.status, cr.date, c.price, c.title, c.category, c.course_description,  c.image_link
            FROM Cart cr 
            INNER JOIN Courses c
            USING (course_id)
            WHERE user_id = ?;`;

        db.query(qryStr, [req.params.id], (err, data) => {
            if (err) throw err;
            res.status(200).json({
                results: data
            });
        });
    }

    // delete all carts matching a specified user
    deleteCarts(req, res) {
        const qryStr = `
            DELETE FROM Cart
            WHERE user_id = ?;`
        db.query(qryStr, [req.params.id], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: 'Cart records have been removed successfully.'
            });
        });
    }

     // delete all carts matching a specified user
     deleteCart(req, res) {
        const qryStr = `
            DELETE FROM Cart
            WHERE (user_id = ?) AND (cart_id = ?);`
        db.query(qryStr, [req.params.uid, req.params.cid], (err) => {
            if (err) throw err;
            res.status(200).json({
                msg: 'Cart records have been removed successfully.'
            });
        });
    }

}

