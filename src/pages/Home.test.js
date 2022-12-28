import { render, screen, fireEvent } from '@testing-library/react';
import Home from './home';
import { BrowserRouter } from 'react-router-dom';

test('Submit button should present', () => {
  render(<BrowserRouter><Home/></BrowserRouter>);

  const submitButton = screen.getByRole('button',{name:'Submit'});
  expect(submitButton).toBeTruthy()
})

test('Submit button should be primary', () => {
  render(<BrowserRouter><Home/></BrowserRouter>);

  const submitButton = screen.getByRole('button',{name:'Submit'});
  expect(submitButton).toHaveClass('btn btn-primary');
})

test('Submit Button should disabled intially' , () => {
  render(<BrowserRouter><Home/></BrowserRouter>);

  const submitButton = screen.getByRole('button',{name:'Submit'});
  fireEvent.click(submitButton);
  expect(submitButton).toBeDisabled();
})