import fastify, {FastifyError} from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });
const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;

server.register(cors, {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" },
  { id: 11, name: "Uralkali Haas F1 Team", base: "Banbury, United Kingdom" },
  { id: 12, name: "Scuderia Toro Rosso", base: "Faenza, Italy" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
];

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


server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server ouvindo em ${address}`);
});
