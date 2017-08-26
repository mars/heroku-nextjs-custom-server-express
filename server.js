const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  
  // Enforce SSL in production
  if (!dev) {
    server.use(function(req, res, next) {
      // Heroku router indicates HTTPS connection w/ client
      var proto = req.headers["x-forwarded-proto"];
      if (proto === "https") {
        res.set({
          'Strict-Transport-Security': 'max-age=7776000' // 90-days
        })
        return next()
      }
      res.redirect("https://" + req.headers.host + req.url)
    });
  }

  // Serve static assets first with cache control
  server.use('/static', express.static(path.join(__dirname, 'static'), {
    maxAge: dev ? '0' : '365d'
  }));
  
  // Serve everything else with Next
  server.get('*', (req, res) => {
    //res.set({
    //  'Cache-Control': 'public, max-age=3600'
    //})
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
