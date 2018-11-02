// app.js
const express = require('express');
var request = require('request');  
var router = express.Router();
const app = express();
var phantom = require('phantom');  
const path = require('path');
const bodyParser = require('body-parser');
const JSON = require('circular-json');  

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
// Require static assets from public folder
// being rendered res.render()
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
// Set view engine as EJS
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var clarity_api = 'https://portal.hydrochem.com.au:2337/form3/NC10247/TWR%2001/14928?adrscode=DARLING%20QUARTER&month=10';


/**
 * Employees API
 */

app.get('/', function(req, res, next) {  
var phantom = require("phantom");
var _ph, _page, _outObj;

var logo = 'https://clarity.hydrochem.com.au/images/logo-r.png';
var font = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700';
var css = 'https://clarity.hydrochem.com.au/styles/report.css';
var fp = 'https://clarity.hydrochem.com.au/images/microReport.jpg';

phantom.create(['--ignore-ssl-errors=true','--load-images=yes','--local-to-remote-url-access=yes', '--ssl-protocol=any']).then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    return _page.open(clarity_api);
    _page.property('paperSize', { format: 'A4', orientation: 'portrait', border: '1cm' });
}).then(function(status){
    console.log('Status: ' + status);
    var jadePath = path.join(__dirname, '/templates/form3Report.jade');
    return _page.property('content', jadePath)
}).then(function(content){
    console.log('Content: ' + content);
    console.log('City Name: ' + content.cityName);
    var dir = __dirname + '/pdfs/';
    var file = dir + 'Test123'+ '.pdf';
    //page.content = "Some html"//Set your html here
    _page.content = content;//Set your html here
    //res.status(200).send(content);
    res.render('index',{'title': 'Employee Records','data': content});    // uncomment with proper jade template
    _page.render(file);
    console.log('Page Rendered');
    _page.close();
    _ph.exit();
}).catch(function(e){
   console.log(e); 
});
    //res.status(200).send(json.result);
    //res.render('index',{'title': 'Employee Records','data': json.result.employees});	// uncomment with proper jade template
    
});




module.exports = app;