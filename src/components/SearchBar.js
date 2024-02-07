import { html, component, useState, useEffect } from 'https://cdn.pika.dev/haunted';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleChange = event => {
    setQuery(event.target.value);
    setShowPlaceholder(false); // It hides the placeholder when the user starts typing
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    // It calls the onSearch callback, which should fetch data using the provided query
    await onSearch(query);
  };

  // This useEffect resets the showPlaceholder state when the component is initially rendered
  
  useEffect(() => {
    setShowPlaceholder(true);
    // since the dependency array is empty, there are no dependencies, and the effect runs only once.
  }, []);

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
        <input class="search-input" type="text" .value=${query} @input=${handleChange} placeholder=${showPlaceholder ? 'Margarita' : ''} />
        <button class="search-button" type="submit">Search</button>
      </form>
    </div>
  `;
}

customElements.define('search-bar', component(SearchBar));
