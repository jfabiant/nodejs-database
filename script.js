var express = require('express')
var app = express()
var mysql = require('mysql')
//var routes = require('./routes/routes')

app.use(express.static(__dirname+'/public'))
//app.use('/', routes)
app.set('views', __dirname+"/views")
app.set('view engine', 'ejs')

var connection = mysql.createPool({
    ///Properties ...
    connectionLimit: 50,
    host:'localhost',
    user: 'root',
    password: '',
    database: 'playtec'
});

app.get('/', function(req, res){
    //About mysql ...
    connection.getConnection(function(error, tempCont){
        if(!!error){
            tempCont.release()
            console.log('Error')
        } else {
            console.log('Conectado!')
            tempCont.query('select * from curso', function(error, rows, fields){
                tempCont.release()
                if(!!error){
                    console.log('Error en la peticion')
                } else {
                    console.log(rows)
                    res.render('index', {records: rows})
                }
            })
        }
    })
});

app.listen(9000)