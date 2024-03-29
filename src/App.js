import { html, component, useState, useEffect } from "https://cdn.pika.dev/haunted";
import "./components/CocktailCard.js";
import "./components/ShoppingList.js";
import "./components/SearchBar.js";
import "./components/ToastMessage.js";
import { useCocktailSearch } from "./services/CocktailAPI.js";

function App() {
  const [query, setQuery] = useState("margarita");
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const { cocktails, loading, error } = useCocktailSearch(query);
  const [shoppingList, setShoppingList] = useState(() => {
    const storedList = localStorage.getItem('shoppingList');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);
  
  

  // Function to handle cocktail search
  const handleSearch = (newQuery) => {
    setIsInitialSearch(false); // Update the flag when a new search is initiated
    setQuery(newQuery);
    setToastMessage("Searching...");
    setToastType("searching");
  };

 


  // It displays toast messages based on the results of the cocktail search
  useEffect(() => {

    // It ensures that the initial toast messages won't be displayed when the app starts, regardless of the search query.
    if (!isInitialSearch) {
      if (cocktails.length === 0) {
        setToastMessage("No results found.");
        setToastType("noResultsFound");
      } else {
        setToastMessage("Here are the results.");
        setToastType("resultsFound");
      }
    }
  }, [query, cocktails, isInitialSearch]);


// Function to handle adding a cocktail to the shopping list
const handleAddToShoppingList = (cocktail) => {

  // Extracts ingredients from the cocktail
  const ingredients = Object.keys(cocktail)
    .filter((key) => key.startsWith("strIngredient") && cocktail[key])
    .map((key) => cocktail[key]);

// Check if any ingredients are already in the list and update accordingly
setShoppingList((prevList) => {
  const updatedList = [...prevList];
  ingredients.forEach((ingredient) => {
    if (!updatedList.includes(ingredient)) {
      updatedList.push(ingredient);
    }
  });
  return updatedList;
});

setToastMessage(`Cocktail "${cocktail.strDrink}" ingredients added to shopping list.`);
setToastType("addedToShoppingList");
};


  // Function to handle deleting an ingredient from the shopping list
  const handleDeleteFromShoppingList = (ingredient) => {
    const newShoppingList = shoppingList.filter((item) => item !== ingredient);
  
    setShoppingList(newShoppingList);
  
    // Display toast message for the deleted ingredient
    setToastMessage(`Ingredient "${ingredient}" removed from shopping list.`);
    setToastType("removedFromShoppingList");
  };
  

  // Function to handle printing the shopping list
  const handlePrintShoppingList = () => {
  // Creates a string representation of the shopping list
  const shoppingListString = shoppingList.join('\n');

  // Open a browser print dialog with the shopping list string
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Shopping List</title>
      </head>
      <body>
        <pre>${shoppingListString}</pre>
      </body>
    </html>
  `);
  printWindow.document.close();
  // Trigger the browser's print dialog
  printWindow.print();

};


  return html`
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

  body {
    font-family: "Poppins", sans-serif !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  #header {
    background-color: #091f2b;
    color: white;
    padding: 20px;
    text-align: center;
    font-family: "Poppins", sans-serif;
    font-weight: 100 !important;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }

  #header:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h1 {
    margin: 0;
  }

  .main-content {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .cocktail-results {
    flex: 1;
    color: black;
  }

  .cocktail-card {
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }

  .cocktail-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .sidebar {
    width: 300px;
    margin-left: 20px;
  }

  .shopping-list {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }

  .shopping-list:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  button {
    background-color: #184761;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #091f2b;
  }

  .toast-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3498db; /* Consistent background color for all messages */
    color: white;
    padding: 15px;
    display: none;
    font-family: 'Poppins', sans-serif;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
  }

  .toast-message:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }


  /* Mobile responsiveness */
  @media only screen and (max-width: 600px) {
    .main-content {
      flex-direction: column;
    }

    .cocktail-results {
      width: 100%;
    }

    .sidebar {
      width: 100%;
      margin-left: 0;
    }
  }

  /* Tablet responsiveness */
  @media only screen and (min-width: 601px) and (max-width: 1024px) {
    .main-content {
      flex-direction: column;
    }

    .cocktail-results {
      width: 100%;
    }

    .sidebar {
      width: 100%;
      margin-left: 0;
    }
  }


</style>
<div>
<div>
  <div id="header">
    <search-bar .onSearch=${handleSearch}></search-bar>
  </div>
  <div>
    <div class="main-content">
      <div class="cocktail-results">
        ${loading
          ? html`<p>Loading...</p>`
          : error
          ? html`<p>Error: ${error}</p>`
          : cocktails.map(
              (cocktail) => html`<cocktail-card
                .cocktail=${cocktail}
                .onAdd=${() => handleAddToShoppingList(cocktail)}
              ></cocktail-card>`
            )}
      </div>
      <div class="sidebar">
        <shopping-list
          .ingredients=${shoppingList}
          .onDelete=${handleDeleteFromShoppingList}
        ></shopping-list>
        <button @click=${handlePrintShoppingList}>
          Print Shopping List
        </button>
      </div>
    </div>
  </div>
</div>
<toast-message
  .message=${toastMessage}
  .type=${toastType}
></toast-message>
</div>
  `;
}

customElements.define("cocktail-app", component(App));
