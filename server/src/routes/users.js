
export default function(router) {
  router.get('/', function (req, res) {
    res.send('<script src="/socket.io/socket.io.js"></script>\n' +
        '<script>\n' +
        '  var socket = io();\n' +
        '</script>');
  });

  return router;
}
