import { render, screen } from '@testing-library/react';
import ParkAllocation from './parkAllocations';
import { BrowserRouter } from 'react-router-dom';

test('Heading element should present', () => {
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);
  
    let headingElement = screen.getByTestId('heading')
    expect(headingElement).toBeTruthy()
})

test('Should have a heading', () => {
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);
    let headingElement = screen.getByTestId('heading')
    expect(headingElement).toHaveTextContent("Parking allocations")
})

test('Should render parking slots equal to value entered', () => {
    let parkingSlots = 3;
    localStorage.setItem("value",parkingSlots);
    const {container} = render(<BrowserRouter><ParkAllocation/></BrowserRouter>);
    expect(container.getElementsByClassName('parkingSlot').length).toBe(parkingSlots);
})

test('Book button should present', () => {
    let parkingSlots = 3;
    localStorage.setItem("value",parkingSlots);
    const {container} = render(<BrowserRouter><ParkAllocation/></BrowserRouter>);
    expect(container.getElementsByClassName('Bookbutton').length).toBe(parkingSlots);
})