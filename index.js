

const http = require('http');
const express = require('express');

var app = express(); //��������
http.createServer(app).listen(5050);

/**����̬��Դ����**/
app.use(express.static('public'));

app.get('/', (req, res)=>{
    //�����ض�����һ��URL�����൱��Ĭ����ҳ
    res.redirect('/index.html');
});

app.get('/getTime', (req, res)=>{
    var time=60;//Date.parse(new Date());
    res.json({time:time});
});

