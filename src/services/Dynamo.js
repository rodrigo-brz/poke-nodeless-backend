const AWS = require("aws-sdk");

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `Ocorreu um erro ao buscar dados para o ID de ${ID} na Tabela ${TableName}`
      );
    }
    console.log(data);

    return data.Item;
  },

  async getAll(TableName) {
    const params = {
      TableName,
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `Ocorreu um erro ao buscar dados para o ID de ${ID} na Tabela ${TableName}`
      );
    }
    console.log(data);

    return data.Item;
  },

  async write(data, TableName) {
    if (!data.ID) {
      throw Error("Nenhum ID informado");
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `Ocorreu um erro ao adicionar o ID de ${data.ID} na tabela ${TableName}`
      );
    }

    return data;
  },

  async writePokemon(data, TableName) {
    console.log("Dentro do write Pokemon");
    console.log(data);
    const params = {
      TableName,
      Item: data,
    };
    console.log(params);
    const res = await documentClient.put(params).promise();
    console.log(res);

    if (!res) {
      throw Error(
        `Ocorreu um erro ao adicionar as informações na tabela ${TableName}`
      );
    }

    return data;
  },
};
module.exports = Dynamo;
