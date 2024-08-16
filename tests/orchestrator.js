import retry from "async-retry";

export default async function waitForAllServices() {
  await estabilishWebserverConnection();

  async function estabilishWebserverConnection() {
    return retry(
      async () => {
        const response = await fetch("http://localhost:3000/api/v1/status");

        if (response.status !== 200) {
          throw Error(`Error: invalid response status ${response.status}`);
        }
      },
      {
        retries: 100,
        maxTimeout: 5000,
      },
    );
  }
}
