var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require('request');
var cheerio = require('cheerio');
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
        console.log(data)
        var options = {
            'method': 'POST',
            'url': 'https://api.codemao.cn/tiger/v3/web/accounts/login',
            'headers': {
                'Content-Type': 'application/json',
                'Cookie': 'acw_tc=707c9fda15976443535474157e34e891ac5e1e02d4e9bf0d27209fcc2fb0b0; authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzEwODcsInVzZXJfdHlwZSI6InN0dWRlbnQiLCJqdGkiOiI4YjJiNjNiYy02Yjk5LTQ0MDUtOGE1NC1kNTM4MGI2OTk1MGYiLCJpYXQiOjE1OTc2NDQzNTN9.ORnMA5cVqJfzpdYSqY7bzqCIRnZACVN39pHe7VoPow0'
            },
            body: JSON.stringify(data)
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
        'url': 'https://api.codemao.cn/web/works/subjects/1061/works?&offset=' + works_n + '&limit=20&sort=-audited_at,-id',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=2f624a5915977669227243705e5c36be342e67581fa890b2757f4b965f25c6'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
app.post('/posts', function (req, res) {
    var posts_n = req.body.posts_n;
    var options = {
        'method': 'GET',
        'url': 'https://api.codemao.cn/web/works/subjects/labels/1258/posts?offset=' + posts_n + '&limit=20',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=707c9f9415977711032364220e56d5946ba3bf495fd300eb7b18482db3d3c8'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
app.post('/posts/search', function (req, res) {
    var posts_n = req.body.posts_n;
    var word = req.body.word;
    var options = {
        'method': 'GET',
        'url': 'https://api.codemao.cn/web/works/subjects/labels/1258/posts?keyword=' + word + '&limit=20&offset=' + posts_n + '&limit=20',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=707c9f9415977711032364220e56d5946ba3bf495fd300eb7b18482db3d3c8'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
app.post('/join', function (req, res) {
    var posts = req.body;
    var options = {
        'method': 'POST',
        'url': 'https://api.codemao.cn/web/work_shops/users/apply/join',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'acw_tc=2f624a0315978848936781444e349b1d5f863db98a36d417011e630956690a; authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzEwODcsInVzZXJfdHlwZSI6InN0dWRlbnQiLCJqdGkiOiIyNTc4MmQzOC1lMWI2LTRmYWQtOGFjNS1hY2JlNjIzZTU1NjUiLCJpYXQiOjE1OTc4ODU0NTh9.PaYgyb2_iQzWZ1rcHvcPeWwllSp0JCt0Aier3cxAYFo'
        },
        body: JSON.stringify(posts)
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.status(response.statusCode);
        res.json(JSON.parse(response.body))
    });
});
app.get('/isjoin', function (req, res) {
    var id = 745;
    var options = {
        'method': 'GET',
        'url': 'https://api.codemao.cn/web/work_shops/users/join/judge?id=' + id,
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNzEwODcsInVzZXJfdHlwZSI6InN0dWRlbnQiLCJqdGkiOiIyNTc4MmQzOC1lMWI2LTRmYWQtOGFjNS1hY2JlNjIzZTU1NjUiLCJpYXQiOjE1OTc4ODU0NTh9.PaYgyb2_iQzWZ1rcHvcPeWwllSp0JCt0Aier3cxAYFo; acw_tc=707c9fcb15978869106918396e2ec63fe7dfc28f6f9f00ed3b995d6257d6f5'
        }
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