const subscribe = async () => {
  const emailInput = document.querySelector("#email-input").value;
  const languageInput = document.querySelector("#language-input").value;
  const errorAlertRef = document.querySelector("#error-alert");
  const errorMsgRef = document.querySelector("#error-msg");
  if (emailInput == "" || languageInput == "") {
    errorAlertRef.style.display = "block";
    errorMsgRef.innerHTML = "Incorrect or missing values";
    return;
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
    errorAlertRef.style.display = "block";
    errorMsgRef.innerHTML = "Invalid email";
    return;
  }
  errorAlertRef.style.display = "none";
  //hide subscribe btn
  const subscribeBtn = document.querySelector("#subscribe-btn");
  subscribeBtn.style.display = "none";
  //show loader
  const loader = document.querySelector("#loader");
  loader.style.display = "block";

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
    .catch((error) => {
      errorAlertRef.style.display = "block";
      errorMsgRef.innerHTML = "Somethings gone wrong.";
    });
  //hide loader
  loader.style.display = "none";
};
