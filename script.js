var express = require('express')
var app = express()
var mysql = require('mysql')
//var routes = require('./routes/routes')

app.use(express.static(__dirname+'/public'))
//app.use('/', routes)
app.set('views', __dirname+"/views")
app.set('view engine', 'ejs')

var connection = mysql.createConnection({
    ///Properties ...
    host:'localhost',
    user: 'root',
    password: '',
    database: 'playtec'
});

connection.connect(function (error) {
    //callback ...
    if (!!error) {
        console.log('Error')
    } else {
        console.log('Connected')
    }
});

app.get('/', function(req, res){
    //About mysql ...
    connection.query("select * from curso", function(error, rows, fields){
        //Callback ...
        if(!!error){
            console.log('Error en la query')
        } else {
            console.log('Successful Query')
            console.log(rows)
            res.render('index', {records: rows})
        }
    });
});

app.listen(9000)