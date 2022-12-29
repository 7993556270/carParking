import { render, screen, fireEvent } from '@testing-library/react';
import Home from './home';
import { BrowserRouter } from 'react-router-dom';


const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

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

test('inputElement and state have the value that user enters', ()=>{
  render(<BrowserRouter><Home/></BrowserRouter>);

  const inputElement = screen.getByRole('button',{name:'Submit'})
  fireEvent.change(inputElement,{target: {value :'5'}})
  expect(inputElement.value).toBe('5')

})

test('Should navigate to parking allocation page on clicking', ()=>{
  const arr = []
  render(<BrowserRouter><Home></Home> </BrowserRouter>)
  const submitButton = screen.getByRole('button',{name :'Submit'})
  const inputElement = screen.getByTestId('input')
  fireEvent.change(inputElement,{target: {value :'5'}})
  fireEvent.click(submitButton);
  expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
})