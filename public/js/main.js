const subscribe = async () => {
  const emailInput = document.querySelector("#email-input").value;
  const languageInput = document.querySelector("#language-input").value;
  await fetch(`/api/user/subscribe?email=${emailInput}&lang=${languageInput}`)
    .then((response) => {
      response.json().then((json) => {
        if (json.success) {
          const message =
            "Thank you for subscribing, please check your email for a notification :)";
          const successAlertRef = document.querySelector("#success-alert");
          const successMsgRef = document.querySelector("#success-msg");
          successMsgRef.innerHTML = message;
          successAlertRef.style.display = "block";
        }
      });
    })
    .catch((error) => console.log(error));
};
