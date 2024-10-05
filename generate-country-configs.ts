import * as fs from "fs";
import { argv } from "process";

const envCredentialsMap = {
  local: {
    headers: {
      "CF-Access-Client-Id": "ac5ba45efda6100737a2436a86f2f06e.access",
      "CF-Access-Client-Secret":
        "2d8297f347997c6765d02d211e714d61fee75efab442baa088d7efff24a9a1d3",
    },
    host: "https://api-local.invernspirit.com",
  },
  preview: {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
    host: "https://preview-api.invernspirit.com",
  },
  production: {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
    host: "https://api.invernspirit.com",
  },
};

const getCredentials = (env?: string) => {
  const selectedEnv = Object.entries(envCredentialsMap).find(
    ([key]) => key === env,
  );

  if (!selectedEnv) {
    throw new Error("Invalid env: " + env);
  }

  return selectedEnv[1];
};

const getCountryConfigs = () => {
  const env = argv[2];

  const credentials = getCredentials(env);

  fetch(`${credentials.host}/country/all`, {
    headers: credentials.headers,
  })
    .then((response) => {
      console.log(
        "getting response from server. Response code: ",
        response.status,
      );
      response.json().then((data) => {
        fs.writeFileSync("public/data.json", JSON.stringify(data.data));
      });
    })
    .catch((err) => {
      throw err;
    });
};

getCountryConfigs();
