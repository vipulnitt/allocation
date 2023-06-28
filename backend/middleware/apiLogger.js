const apiLogger = (req, res, next) => {
    console.log("header: "+JSON.stringify(req.cookies));
    
    const { method, url, params, query, body } = req;
    const log = `[${new Date().toISOString()}] ${method} ${url}`;
    console.log(log);
    console.log('Params:', params);
    console.log('Query:', query);
    console.log('Body:', body);
    next();
  };
  
  module.exports = apiLogger;
  