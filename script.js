let cart = [];
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartItems = document.getElementById("cartItems");
const orderField = document.getElementById("order");

// Funkcja aktualizacji koszyka
function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total;

  // Wyświetlanie listy produktów
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.product} – ${item.price} zł`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  // wpisanie zamówienia do formularza
  const orderText = cart.map(item => `• ${item.product} – ${item.price} zł`).join("\n");
  orderField.value = orderText + (total > 0 ? `\n\nRazem: ${total} zł` : "");
}

// Dodawanie do koszyka
document.querySelectorAll("button[data-product]").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const price = parseFloat(button.getAttribute("data-price"));

    cart.push({ product, price });
    updateCart();
  });
});
