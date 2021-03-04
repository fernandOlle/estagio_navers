const Getter = async () => {
  let sendBack = [];
  const api = 'https://my-json-server.typicode.com/naveteam/fake-api/navers';

  await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      sendBack = data;
    });

  return sendBack;
};

export default Getter;
