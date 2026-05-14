import { app } from "./app.js";

const defaultPort = 3000;
const port = Number(process.env.PORT ?? defaultPort);

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
