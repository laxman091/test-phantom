'use strict';
//
// server.js
//


const test = require('./test');
const port2 = 4042;

test.listen(port2, function() {  
    console.log('Testing server listening on port ' + port2);
});