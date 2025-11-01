
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Commission Calculator App', () => {
  test('shows validation error for negative input', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Local Sales Count/i), { target: { value: -1 } });
    fireEvent.change(screen.getByLabelText(/Foreign Sales Count/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/Average Sale Amount/i), { target: { value: 100 } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Commission/i }));
    expect(screen.getByText(/Local Sales Count must be 0 - 100000/i)).toBeInTheDocument();
  });

  test('shows validation error for upper bound', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Local Sales Count/i), { target: { value: 100001 } });
    fireEvent.change(screen.getByLabelText(/Foreign Sales Count/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/Average Sale Amount/i), { target: { value: 100 } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Commission/i }));
    expect(screen.getByText(/Local Sales Count must be 0 - 100000/i)).toBeInTheDocument();
  });

});
