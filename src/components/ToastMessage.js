import { html, component, useEffect, useState } from 'https://cdn.pika.dev/haunted';

function ToastMessage({ message, type }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide the message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getMessageStyle = () => {
    switch (type) {
      case 'removedFromShoppingList':
        return 'background-color: #45050e;'; 
      default:
        return 'background-color: #091f2b;'; // Default background color
    }
  };
  

  return html`
    <style>
      .toast-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        color: white;
        padding: 15px;
        display: ${isVisible ? 'block' : 'none'};
        font-family: 'Poppins', sans-serif;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        ${getMessageStyle()}
      }
    </style>
    <div class="toast-message">
      <p>${message}</p>
    </div>
  `;
}

customElements.define('toast-message', component(ToastMessage));
