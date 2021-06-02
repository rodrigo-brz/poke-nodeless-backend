const Responses = require("../services/API_Responses");
const pokemonApi = require("../api/index");

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID
    return Responses._400({ message: "Missing the ID from the path" });
  }

  let ID = event.pathParameters.ID.toLowerCase();

  try {
    const { data } = await pokemonApi.get(`pokemon/${ID}`);
    const pokemon = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      weight: data.weight,
      height: data.height,
      ability: data.abilities[0].ability.name,
      type:
        data.types.length > 1
          ? [data.types[0].type.name, data.types[1].type.name]
          : [data.types[0].type.name],
      stats: [
        data.stats[0].base_stat,
        data.stats[1].base_stat,
        data.stats[2].base_stat,
        data.stats[3].base_stat,
        data.stats[4].base_stat,
        data.stats[5].base_stat,
      ],
    };
    return Responses._200(pokemon);
  } catch (err) {
    return Responses._400({ message: "Failed found that Pokemon :(" });
  }
};
