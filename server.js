var koa = require('koa');
var app = koa();
var url = require('url');

// Force SSL on all page
if (app.env === 'production') {
  app.use(function *(next){
    var protocol = this.request.protocol;
    console.log('protocol', protocol);
    var isHTTPS = (protocol === 'https');
    if (isHTTPS) {
       return yield next;
    } else {
      this.response.status = 301;
      this.response.redirect(this.request.href.replace(/^http/, 'https'));
    }
  });
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
