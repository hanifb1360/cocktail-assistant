import { html, component } from "https://cdn.pika.dev/haunted";

function ShoppingList({ ingredients, onDelete }) {
  // Deduplicate ingredients
  const uniqueIngredients = [...new Set(ingredients)];

  return html`
    <style>
      .shopping-list {
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
      }

      .shopping-list:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      h2 {
        margin-top: 0;
        font-family: "Poppins", sans-serif;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-family: "Poppins", sans-serif;
      }

      button {
        background-color: #e74c3c;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: auto; /* Push the button to the right */
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color: #c0392b;
      }
    </style>

    <div class="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        ${uniqueIngredients.map(
          (ingredient) => html`
            <li>
              ${ingredient}
              <button @click=${() => onDelete(ingredient)}>Delete</button>
            </li>
          `
        )}
      </ul>
    </div>
  `;
}

customElements.define("shopping-list", component(ShoppingList));

// I've added a deduplication step using the Set data structure to ensure that each ingredient is displayed only once.
