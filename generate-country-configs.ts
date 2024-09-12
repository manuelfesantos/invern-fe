import * as fs from "fs";

const getCountryConfigs = () => {
  fetch("https://preview.invern-be.pages.dev/country/all", {
    headers: {
      "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
      "CF-Access-Client-Secret":
        "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
    },
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
