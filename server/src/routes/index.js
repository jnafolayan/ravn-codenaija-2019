import logger from "../utils/logger";

export default function(router) {
  router.get('/', function (req, res) {

    res.send(
        `
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js">
</script>
        <script>
        var socket = io();
        socket.on('feed', (msg) => {
          console.log(JSON.stringify(socket.id), msg); // 'G5p5...'
        });
        </script>
`
    );
  });

  return router;
}
