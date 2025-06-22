import App from '../App';
jest.mock('expo', () => ({ registerRootComponent: jest.fn() }));
import { registerRootComponent } from 'expo';

test('registers root component', () => {
  require('../index');
  expect(registerRootComponent).toHaveBeenCalledWith(App);
});
