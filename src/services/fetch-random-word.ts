import axios from "axios";

export const getFetchRandomWord = () => {};

const fetchRandomEnglishWord = () => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    headers: {
      "X-RapidAPI-Key": !process.env.rapid_api_key,
      "X-RapidAPI-Host": !process.env.rapid_api_host,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchWordDescription = (word: string) => {
  const options = {
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data[0].meanings[0].partOfSpeech);
      console.log(response.data[0].meanings[0].definitions[0].definition);
    })
    .catch((error) => {
      console.error(error);
    });
};

const translateWord = (word: string, language: string) => {
  const options = {
    method: "POST",
    url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.google_api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
