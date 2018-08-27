const form = document.querySelector("#item-form");
const itemList = document.querySelector(".shopping-list-items");
const clearButton = document.querySelector(".clear-items");
const filter = document.querySelector("#filter");
const itemInput = document.querySelector("#item");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getItems);

  form.addEventListener("submit", addItem);

  itemList.addEventListener("click", removeItem);

  clearButton.addEventListener("click", clearItems);

  filter.addEventListener("keyup", filterItems);
}

function getItems() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach(function(item) {
    const li = document.createElement("li");

    li.className = "shopping-list-item";

    items = document.querySelectorAll(".shopping-list-item");

    li.appendChild(document.createTextNode(`${item}`));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    li.appendChild(link);

    itemList.appendChild(li);
  });
}

function addItem(e) {
  e.preventDefault();

  if (itemInput.value === "") {
    alert("Please add an Item");
  } else {
    const li = document.createElement("li");

    li.className = "shopping-list-item";

    items = document.querySelectorAll(".shopping-list-item");

    li.appendChild(document.createTextNode(` ${itemInput.value}`));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    li.appendChild(link);

    itemList.appendChild(li);

    storeItemInLocalStorage(itemInput.value);

    itemInput.value = "";
  }
}

function storeItemInLocalStorage(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items = [...items, item];

  localStorage.setItem("items", JSON.stringify(items));
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    let ItemToRemove = e.target.parentElement.parentElement;
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      removeItemFromLocalStorage(ItemToRemove);
    }
  }
}

function removeItemFromLocalStorage(listItem, index) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  let newItems = items.filter(function(item) {
    return item !== listItem.textContent;
  });

  console.log(newItems);

  localStorage.setItem("items", JSON.stringify(newItems));
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  clearItemsFromLocalStorage();
}

function clearItemsFromLocalStorage() {
  localStorage.clear();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  list = document
    .querySelectorAll(".shopping-list-item")
    .forEach(function(item) {
      const itemContent = item.firstChild.textContent;

      if (itemContent.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
}
