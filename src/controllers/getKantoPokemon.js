const Responses = require("../services/API_Responses");
const pokemonApi = require("../api/index");

exports.handler = async (event) => {
  try {
    const { data } = await pokemonApi.get("pokemon?limit=151");
    return Responses._200({ data });
  } catch (err) {
    return Responses._400({ message: "Failed get Pokemons :(" });
  }
};
