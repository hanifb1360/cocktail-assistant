import { html, component, useState } from 'https://cdn.pika.dev/haunted';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    // It calls the onSearch callback, which should fetch data using the provided query
    await onSearch(query);
  };

  return html`
    <style>
      .search-bar {
        margin-bottom: 20px;
      }

      form {
        display: flex;
        align-items: center;
      }

      .search-input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 10px;
      }

      .search-button {
        background-color: #184761;
        color: white;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }

      .search-button:hover {
        background-color: #2980b9;
      }
    </style>
    
    <div class="search-bar">
      <form @submit=${handleSubmit}>
        <input class="search-input" type="text" .value=${query} @input=${handleChange} placeholder="Margarita" />
        <button class="search-button" type="submit">Search</button>
      </form>
    </div>
  `;
}

customElements.define('search-bar', component(SearchBar));
