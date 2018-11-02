var input = '<h1>Hello word</h1>'
var output = 'file.pdf'

const express = require('express');
const test = express();
var phantom = require('phantom');

phantom.create([
  '--ignore-ssl-errors=yes',
  '--load-images=yes',
  '--local-to-remote-url-access=yes'
]).then(function(ph) {
  ph.createPage().then(function(page) {
    page.property('content', input).then(function() {
      page.render(output)
        .catch(function() {
          console.log('error');
          ph.exit();
        })
        .then(function() {
          console.log('success');
          ph.exit();
        });
    });
  });
});


module.exports = test;