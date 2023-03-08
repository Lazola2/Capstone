import express from 'express'
import route from './controllers/index.js'
import cors from 'cors'
import errorHandling from './middleware/ErrorHandling.js'
import cookieParser from 'cookie-parser'

const app = express();
/*
express.json: setting the content-type to application/json
bodyParser.urlencoded( {extended: true} ): Object will contain
values of any type instead of just a string
*/

app.use((req, res, next)=> {
    // the http://localh... allows you to access the api's from the local host root on vue js       
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next();
});

app.use(route);
app.use(cors(), cookieParser(), express.json, express.urlencoded({extended: true}));

app.listen(5050, () => {
    console.log('Server is running at port 5050');
});

// handling error
app.use(errorHandling);

