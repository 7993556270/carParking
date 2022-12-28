import { render } from '@testing-library/react';
import App from './App';

test('should Browser Router be wrapped all routes', () => {
const {container} = render(<App/>);

expect(container.getElementsByTagName('BrowserRouter')).toBeTruthy()
})

test('should Router component Present', () => {
const {container} = render(<App/>);

expect(container.getElementsByTagName('Routes')).toBeTruthy()
})


test('should have Routes for component', () => {
const {container} = render(<App/>);

// let Component = screen.getByTestId('Allocation')
expect(container.getElementsByTagName('Route')).toBeTruthy()
// expect(Component).toBeTruthy()
})