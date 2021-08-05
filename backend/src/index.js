const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(express.json());


app.use(express.urlencoded({ extended: false}));


//app.options('*', cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//app.use(cors());


app.use(routes);




app.listen(3333);