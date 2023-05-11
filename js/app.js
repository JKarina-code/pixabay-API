const result = document.querySelector("#result");
const formPixa = document.querySelector("#formPixa");
let actualPage = 1;
window.onload = () => {
  formPixa.addEventListener("submit", validateForm);
};

function validateForm(e) {
  e.preventDefault();

  const termSearch = document.querySelector("#term").value;

  if (termSearch === "") {
    showAlert("Please add a search term");
  }

  searchImages(termSearch);
}

function showAlert(message) {
  const existAlert = document.querySelector(".alert");
  if (!existAlert) {
    const alert = document.createElement("P");
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "m-auto",
      "mt-6",
      "alert"
    );

    alert.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${message}</span>
`;

    formPixa.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function searchImages(termSearch) {
  const key = "36301233-bbb99c791a41aa0581d1dbb44";
  const url = `https://pixabay.com/api/?key=${key}&q=${termSearch}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showImages(data.hits));
}

function showImages(images = []) {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  images.forEach((image) => {
    const { likes, views, previewURL, largeImageURL } = image;

    result.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
        <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
            <div class="p-4">
                <p class="card-text">${likes} ❤ </p>
                <p  class="card-text">${views} <img src="./images/view.png" alt="view" class="h-5 inline"></p> 
                <a href=${largeImageURL}  rel="noopener noreferrer" target="_blank" class="bg-blue-500 w-full p-1 block mt-5 rounded text-center font-bold  hover:bg-blue-500 text-white">View Image</a>
            </div>
        </div>
    </div>
`;
  });
}
