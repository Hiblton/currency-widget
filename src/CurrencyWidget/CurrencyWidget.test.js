import React from 'react';
import ReactDOM from 'react-dom';

import CurrencyWidget from './CurrencyWidget';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrencyWidget />, div);
});
