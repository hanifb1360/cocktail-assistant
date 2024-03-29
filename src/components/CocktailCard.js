import { html, component, useState } from 'https://cdn.pika.dev/haunted';

function CocktailCard({ cocktail, onAdd }) {
  const [added, setAdded] = useState(false);

  // when ingredients are removed from the shopping list, the button will become clickable again.
  // useEffect(() => {
  //   setAdded(false);
  // }, [onAdd]);

  const handleAdd = () => {
    onAdd(cocktail);
    setAdded(true);
  };

  return html`
    <style>
      .cocktail-card {
        display: flex;
        border: 1px solid #ddd;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
      }

      .cocktail-card:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }

      .thumbnail {
        max-width: 100px; /* Adjust the width as needed */
        max-height: 100px; /* Set the maximum height to maintain aspect ratio */
        width: auto;
        height: auto;
        margin-right: 15px;
        border-radius: 4px;
      }

      .content {
        flex: 1;
      }

      h3 {
        margin-top: 0;
        font-family: 'Poppins', sans-serif;
      }

      p {
        margin-bottom: 10px;
        font-family: 'Poppins', sans-serif;
      }

      .add-button {
        align-self: flex-end;
        background-color: #184761;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        transition: background-color 0.3s ease;
        margin-left: 15px; /* Add a gap between the button and the left box */
      }

      .add-button:hover {
        background-color: #2079b0;
      }

      .add-button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }

      /* Mobile responsiveness */
      @media only screen and (max-width: 600px) {
        .cocktail-card {
          flex-direction: column;
          align-items: center;
        }
    
        .thumbnail {
          max-width: 100%; /* Adjust the width as needed */
          max-height: auto; /* Allow the height to adjust according to the width */
          margin-right: 0;
          margin-bottom: 10px;
        }
    
        .content {
          text-align: center;
        }
    
        .add-button {
          align-self: center;
          margin-left: 0;
        }
      }
    
      /* Tablet responsiveness */
      @media only screen and (min-width: 601px) and (max-width: 1024px) {
        /* Add specific styles for tablets if needed */
      }

    </style>

    <div class="cocktail-card">
      <img class="thumbnail" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
      <div class="content">
        <h3>${cocktail.strDrink}</h3>
        <p>${cocktail.strInstructions}</p>
      </div>
      <button class="add-button" @click=${handleAdd} ?disabled=${added}>Add to Shopping List</button>
    </div>
  `;
}

customElements.define('cocktail-card', component(CocktailCard));
