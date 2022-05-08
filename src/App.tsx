import React from 'react';
import ReactDOM from 'react-dom/client';

// eslint-disable-next-line react/function-component-definition
const App:React.FC = () => <div>Hello ))</div>;

const element = document.getElementById('app');
if (element === null) {
  throw new Error('Root element is empty');
}
const root = ReactDOM.createRoot(element);
root.render(<App />);
