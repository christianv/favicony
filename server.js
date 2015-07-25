var koa = require('koa');
var app = koa();
var forceSSL = require('koa-force-ssl');

// Force SSL on all page
console.log('app.env', app.env);
if (app.env === 'production') {
  app.use(forceSSL());
}

// Logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// Standard response
app.use(function *(){
  this.body = 'Hello World';
});

var port = process.env.PORT || 3001;
app.listen(port);
