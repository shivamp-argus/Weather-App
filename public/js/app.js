console.log("client side js loaded");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageTemp = document.querySelector("#message");
const errorTemp = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = input.value;
  fetch("http://localhost:3000/weather?address=" + address)
    .then((response) => {
      //   console.log(response);
      return response.json();
    })
    .then(({ forecastData, location, error }) => {
      if (error) {
        errorTemp.innerText = error;

        // return console.log(error);
      } else {
        messageTemp.innerHTML = `
                                    <p>${forecastData}</p>
                                    <p>${location}
                                `;
        // console.log(location);
      }
    });
});
