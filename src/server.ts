import fastify, {FastifyError} from "fastify";
import cors from "@fastify/cors";

import drivers from  "./data/drivers";
import teams from "./data/teams";

const server = fastify({ logger: true });
const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;

server.register(cors, {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

const driverParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string", pattern: "^[0-9]+$" },
  },
  required: ["id"],
};

server.get<{ Params: DriverParams }>
  ("/drivers/:id", { schema: { params: driverParamsSchema } }, async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);


server.setErrorHandler((error: FastifyError, request, response) => {
  request.log.error(error);

  if (error.statusCode) {
    response.code(error.statusCode).send({ message: error.message });
  } else {
    response.code(500).send({ message: "Internal Server Error" });
  }
});

server.setNotFoundHandler((request, response) => {
  response.code(404).send({ message: "Route Not Found" });
});

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server ouvindo em ${address}`);
});
