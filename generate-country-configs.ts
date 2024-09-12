import * as fs from "fs";

const getCountryConfigs = () => {
  fetch("https://preview.invern-be.pages.dev/country/all")
    .then((response) => {
      console.log(
        "getting response from server. Response code: ",
        response.status,
      );
      response.json().then((data) => {
        console.log("data:", data.data);
        fs.writeFileSync("public/data.json", JSON.stringify(data.data));
      });
    })
    .catch((err) => {
      throw err;
    });
};

getCountryConfigs();
