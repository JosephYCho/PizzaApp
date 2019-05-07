const proxy = require("http-proxy-middleware");

module.export = function(app) {
  app.use(
    proxy("/api", {target:"https://localhost:44308/", chargeOrigin:true})
  );
};