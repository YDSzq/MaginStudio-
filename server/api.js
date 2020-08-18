var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require('request');
var cheerio = require('cheerio');
const { get } = require('core-js/fn/dict');
var pid_os = {
    'method': 'GET',
    'url': 'https://shequ.codemao.cn/',
    'headers': {
        'Content-Type': 'application/json',
        'Cookie': 'SERVERID=307617265e57578918fc2d7553d4a2b5|1597719675|1597719675'
    }
};

app.post('/login', function (req, res) {
    request(pid_os, function (error, response) {
        if (error) throw new Error(error);
        var $ = cheerio.load(response.body);
        var p = $('script')[0].children[0].data.split("=")[1];
        p = JSON.parse(p.trim()).pid;
        var data = req.body;
        data.pid = p;
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

});
app.post('/captcha/rule', function (req, res) {
    request(pid_os, function (error, response) {
        if (error) throw new Error(error);
        var $ = cheerio.load(response.body);
        var p = $('script')[0].children[0].data.split("=")[1];
        p = JSON.parse(p.trim()).pid;
        var data = req.body;
        data.pid = p;
        data.deviceId = "0a66da5287305312fc890d312f928bf7";
        data.timestamp = Number(data.identity);
        console.log(data)
        var options = {
            'method': 'POST',
            'url': 'https://open-service.codemao.cn/captcha/rule',
            'headers': {
                'Content-Type': 'application/json',
                'Cookie': 'acw_tc=2f624a7715977270407513944e0519fa6223ec11a00156f9183a7763d27c73; SERVERID=4d8b32200c0de5e8453fed470c2620eb|1597727040|1597727040'
            },
            body: JSON.stringify(req.body)
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.status(response.statusCode);
            res.json(JSON.parse(response.body))
        });
    });
});
app.post('/logout', function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'https://api.codemao.cn/tiger/v3/web/accounts/logout',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=707c9fd315977179873948497e5e78453603c3effcc08235d6cc96155b1bee'
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
app.post('/works', function (req, res) {
    var works_n = req.body.works_n;
    var options = {
        'method': 'GET',
        'url': 'https://api.codemao.cn/web/works/subjects/labels/1258/posts?limit=20&offset='+works_n,
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=707c9fcc15977551041548599e50d43828f3268b5e597570d50c478594361d'
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