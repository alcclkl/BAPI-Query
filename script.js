const API_URL = document.getElementById("apiUrl");
const API_KEY = document.getElementById("apiKey");
const choiceData = document.getElementById("choice");
const selector = document.getElementById("selector");
const getlist = document.getElementById("getList");
const connection = document.getElementById("connection");
choiceData.hidden = true;
getlist.hidden = true;

async function getCharacters() {
  console.log(API_URL.value + "  " + API_KEY.value);

  try {
    const response = await fetch(`${API_URL.value}`, {
      headers: { Authorization: `Bearer ${API_KEY.value}` },
    });
    data = await response.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  connection.hidden = true;
  choiceData.hidden = false;
  getlist.hidden = false;

  getlist.addEventListener("click", async function (e) {
    const baseUrl = API_URL.value.replace(/\/character$/, "");

    const responseBytype = await fetch(`${baseUrl}/${selector.value}`, {
      headers: { Authorization: `Bearer ${API_KEY.value}` },
    });
    data = await responseBytype.json();
    console.log(data);
  });
}
//maple ve kartlara yazdır.
