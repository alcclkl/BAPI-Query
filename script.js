const API_URL = document.getElementById("inputURL");
const API_KEY = document.getElementById("tokenInput");
const passwordController = document.getElementById("enterToken");
const tokenInput = document.getElementById("tokenInput");
const queryButton = document.getElementById("queryButton");
const rawCode = document.getElementById("rawCode");
const keyList = document.getElementById("keyList");
const preCode = document.getElementById("preCode");
const codeHide = document.getElementById("rawCodeShowHideButton");
const createButton = document.getElementById("createButton");
const createOption = document.getElementById("createOption");
const creatingChoice = document.getElementById("createChoice");
const cardSection = document.getElementById("cardSection");
const innerKeyList = document.getElementById("innerKeyList");
let fetchedData = null;
let keyGlobal = null;
let selectedKeyGlobal = null;
let correspondingValueGlobal = null;

passwordController.addEventListener("change", () => {
  tokenInput.disabled = !passwordController.checked;
});

queryButton.addEventListener("click", async () => {
  try {
    let response;
    if (!passwordController.checked) {
      response = await fetch(API_URL.value);
    } else {
      response = await fetch(`${API_URL.value}`, {
        headers: { Authorization: `Bearer ${API_KEY.value}` },
      });
    }
    const data = await response.json();
    const raw = await JSON.stringify(data, null, 2);
    rawCode.textContent = raw;
    fetchedData = data;

    Prism.highlightElement(rawCode);
    const keys = Object.keys(data);
    keyGlobal = keys;

    const arrayKeys = keys.map((key) => {
      const capitalizedKey = key.toUpperCase();

      return `<option value="${key}">${capitalizedKey}</option>`;
    });
    keyList.innerHTML = arrayKeys.join("");
    keyList.style.display = "block";
    preCode.style.display = "block";
    codeHide.addEventListener("click", () => {
      if (
        (preCode.style.height =
          preCode.style.height === "58px" ? "800px" : "58px")
      );
    });
  } catch {
    errorMessageGif();
  }
});

keyList.addEventListener("change", async (correspondingValue) => {
  //keys içerisinde anahtarlar var. şimdi değerleri al

  const selectedKey = keyList.value;

  // fetchedData'nın değerlerini ve key'lerini al
  const keys = Object.keys(fetchedData);
  const values = Object.values(fetchedData);

  // Eşleşme için döngü
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === selectedKey) {
      const correspondingValue = values[i];
      console.log(`Seçilen Key: ${selectedKey}`);
      console.log(`Karşılık Gelen Değer: ${correspondingValue}`);

      try {
        const response = await fetch(correspondingValue);
        const data = await response.json();

        const raw = JSON.stringify(data, null, 2);
        rawCode.textContent = raw; //
        Prism.highlightElement(rawCode);
      } catch {
        errorMessageGif();
        return;
      }
      correspondingValueGlobal = correspondingValue;
      selectedKeyGlobal = selectedKey;
    }
  }
  try {
    const response = await fetch(correspondingValueGlobal);
    const data = await response.json();
  } catch {
    errorMessageGif();
  }
  keys1 = Object.keys(data);
  const innerKeyList = keys1.map((key) => {
    console.log(key);
    const capitalizedInnerKey = key.toUpperCase();
    console.log(capitalizedInnerKey);
    return `<option value="${key}">${capitalizedInnerKey}</option>`;
  });
});

createButton.addEventListener("click", async () => {
  // Burada correspondingValueGlobal bir URL veya API endpoint olmalı.
  console.log(correspondingValueGlobal);
  try {
    const response = await fetch(correspondingValueGlobal); // API'yi çağır
    console.log(response);
    const data = await response.json();
    console.log(data); // JSON olarak çözümle
    const createCard = data.map((value) => {
      cardSection.innerHTML = `<div class="card" style="width: 18rem;">
  <div class="card-header">
    Featured
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
</div>`;
    });
  } catch (error) {
    errorMessageGif();
  }
});

/* Error Controller */
function errorMessageGif() {
  const modal = document.getElementById("errorModal");
  modal.style.display = "block"; // Modal'ı görünür yap
}

function closeErrorModal() {
  const modal = document.getElementById("errorModal");
  modal.style.display = "none"; // Modal'ı gizle
}
