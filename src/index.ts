import server from "./server";
import { multiServer } from "./server";

const port = process.env.port || 4000;

const mode = process.argv[2]?.toString().trim().toLowerCase();

if (mode == 'single') {
  server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
} else if (mode == 'multi') {
  multiServer(port);
} else {
  console.log('Unknown command')
}
