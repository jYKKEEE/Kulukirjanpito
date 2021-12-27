import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Item from './item';

test('render item from props data', () => {
  render(
    <Router>
      <Item
        data={{
          id: '1234',
          type: 'Sähkö',
          receiver: 'Elenia',
          amount: 89,
          paymentDate: '2021-02-02',
          peridoinStart: '',
          perioidEnd: '',
        }}
      />
    </Router>
  );

  const type = screen.getByText(/Sähkö/i);
  expect(type).toBeInTheDocument();
  const receiver = screen.getByText(/Elenia/i);
  expect(receiver).toBeInTheDocument();
});
