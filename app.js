const form = document.querySelector("#item-form");
const itemList = document.querySelector(".shopping-list-items");
const clearButton = document.querySelector(".clear-items");
const filter = document.querySelector("#filter");
const itemInput = document.querySelector("#item");

loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addItem);

  itemList.addEventListener("click", removeItem);

  clearButton.addEventListener("click", clearItems);
}

function addItem(e) {
  e.preventDefault();

  if (itemInput.value === "") {
    alert("Please add an Item");
  } else {
    const li = document.createElement("li");

    li.className = "shopping-list-item";

    li.appendChild(document.createTextNode(`${itemInput.value}`));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    li.appendChild(link);

    itemList.appendChild(li);

    itemInput.value = "";
  }
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearItems(e) {
  while (itemList) {
    itemList.removeChild(itemList.firstChild);
  }
}
