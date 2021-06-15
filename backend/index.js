const { response } = require('express');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/',(request, response) => {
    return response.json({
       evento: 'tal' 
    });
});


app.listen(3333);