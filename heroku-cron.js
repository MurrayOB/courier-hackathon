const axios = require("axios");

const ping = async () => {
  const options = {
    method: "GET",
    url: "https://courier-hackathon.herokuapp.com/api/user/subscribe",
  };
  axios
    .request(options)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
};

ping();
