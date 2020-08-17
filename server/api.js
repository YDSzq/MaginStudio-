var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require('request');

app.post('/login', function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://api.codemao.cn/tiger/v3/web/accounts/login',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=707c9fda15976443535474157e34e891ac5e1e02d4e9bf0d27209fcc2fb0b0; authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzEwODcsInVzZXJfdHlwZSI6InN0dWRlbnQiLCJqdGkiOiI4YjJiNjNiYy02Yjk5LTQ0MDUtOGE1NC1kNTM4MGI2OTk1MGYiLCJpYXQiOjE1OTc2NDQzNTN9.ORnMA5cVqJfzpdYSqY7bzqCIRnZACVN39pHe7VoPow0'
        },
        body: JSON.stringify(req.body)
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
app.get('/users/details', function (req, res) {
    var options = {
        'method': 'GET',
        'url': 'https://api.codemao.cn/web/users/details',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzEwODcsInVzZXJfdHlwZSI6InN0dWRlbnQiLCJqdGkiOiI4YjJiNjNiYy02Yjk5LTQ0MDUtOGE1NC1kNTM4MGI2OTk1MGYiLCJpYXQiOjE1OTc2NDQzNTN9.ORnMA5cVqJfzpdYSqY7bzqCIRnZACVN39pHe7VoPow0; acw_tc=2f624a5215976618552483941e53b10cd0bd4bd1807e718987c83357c13dbd'
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})