const neo4j = require("neo4j-driver");
const { createYoga } = require("graphql-yoga");
const { Neo4jGraphQL } = require("@neo4j/graphql");

// Read our Neo4j connection credentials from environment variables (see .env.local)
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const typeDefs = /* GraphQL */ `
type Refe {
  ref: String!
  ativo: String!
  principioAtivo: Ativo! @relationship(type: "DE_PRINCIPIO_ATIVO", direction: OUT)
}

type Ativo {
  ativo: String!
  referencias: [Refe!]! @relationship(type: "DE_PRINCIPIO_ATIVO", direction: IN)
}
type Simi {
  sim: String!
  reg: String!
  form: String!
  conc: String!
  data: Int!
  detentorDoRegistro: Reg! @relationship(type: "DETENTOR_DO_REGISTRO", direction: OUT)
}

type Reg {
  reg: String!
  similares: [Simi!]! @relationship(type: "DETENTOR_DO_REGISTRO", direction: IN)
}
type Refe {
  ref: String!
  ativo: String!
  medicamentosReferenciados: [Simi!]! @relationship(type: "MED_REF_DE", direction: OUT)
}

type Simi {
  sim: String!
  reg: String!
  form: String!
  conc: String!
  data: Int!
  medicamentosReferenciadores: [Refe!]! @relationship(type: "MED_REF_DE", direction: IN)
}

type Refe {
  ref: String!
  ativo: String!
  medicamentosSimilares: [Simi!]! @relationship(type: "MED_SIMILAR_DE", direction: IN)
}

type Simi {
  sim: String!
  reg: String!
  form: String!
  conc: String!
  data: Int!
  medicamentosReferenciados: [Refe!]! @relationship(type: "MED_SIMILAR_DE", direction: OUT)
}
`;

// Create a Neo4j driver instance to connect to Neo4j AuraDB
const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

// Type definitions and a Neo4j driver instance are all that's required for building a GraphQL API with the Neo4j GraphQL Library - no resolvers!
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
});

// Building the Neo4j GraphQL schema is an async process
const initServer = async () => {
  console.log("Building GraphQL server");
  return await neoSchema.getSchema();
};

// Note the use of the top-level await here in the call to initServer()
export default createYoga({
  schema: await initServer(),
  graphqlEndpoint: "/api/graphql",
});
