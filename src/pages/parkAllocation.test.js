import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('Should Input element present to enter Vehicle Number', () => {
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);

    const inputElement = screen.getByTestId('inputElement')
    expect(inputElement).toBeInTheDocument();
})

test('Should Submit button present', () => {
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);
    let submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeInTheDocument()
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
    expect(container.getElementsByClassName('BookButton').length).toBe(parkingSlots);
})

test('Should Input element has the value that user enters', ()=>{
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);

    const inputElement = screen.getByTestId('inputElement')
    fireEvent.change(inputElement,{target: {value :'1234'}})
    expect(inputElement.value).toBe('1234')
})

test('Should Input value change on every user input', ()=>{
    render(<BrowserRouter><ParkAllocation/></BrowserRouter>);

    const inputElement = screen.getByTestId('inputElement')
    fireEvent.change(inputElement,{target: {value :'1'}})
    expect(inputElement).toHaveValue('1')

})

test('Should not park when vehicle number is empty', () => {
    const parkRandomly = jest.fn();
    const {queryByTestId} = render(<BrowserRouter><ParkAllocation parkRandomly={parkRandomly}/></BrowserRouter>)

    fireEvent.click(queryByTestId('submit'));

    expect(parkRandomly).not.toHaveBeenCalled();
})

test('Should park when vehicle number is present', () => {
    const parkRandomly = jest.fn();
    const {queryByTestId} = render(<BrowserRouter><ParkAllocation parkRandomly={parkRandomly}/></BrowserRouter>)
    fireEvent.change(queryByTestId('inputElement'),{target: {value :'1'}})
    fireEvent.click(queryByTestId('submit'));

    expect(parkRandomly).toHaveBeenCalled();
})

test('Should park vehicle on click of book', async () => {
    let parkingSlots = 3;
    localStorage.setItem("value",parkingSlots);
    const bookParking = jest.fn();
    
    const {queryByTestId} = render(<BrowserRouter><ParkAllocation bookParking={bookParking}/></BrowserRouter>);
    await fireEvent.click(queryByTestId('slot1'));

    expect(bookParking).toHaveBeenCalled();
})

test('Should show bill when deallocating the slots', async () => {
    let dummyData = [
        {
          "id": 2015,
          "isAllocated": true,
          "locationName": "MahaLakshmi Layout",
          "parkedTime": "2022-12-28T11:50:12.187Z",
          "timetoDisplay": "5:20 PM",
          "vehicleNum": "65789"
        },
        {
          "id": 6904,
          "isAllocated": false,
          "locationName": "MahaLakshmi Layout"
        }
    ]

    localStorage.setItem('details',JSON.stringify(dummyData));
    const deallocate = jest.fn();
    const {queryByTestId} = render(<BrowserRouter><ParkAllocation deallocate={deallocate}/></BrowserRouter>);
    await fireEvent.click(queryByTestId('deallocate0'));

    await waitFor( () => expect(deallocate).toHaveBeenCalled());
})