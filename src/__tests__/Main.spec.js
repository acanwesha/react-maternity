import renderer from 'react-test-renderer';
import Main from '../components/Main';

it('renders correctly', () => {
  const props = {
    match: {
      params: {
        id: 1
      }
    }
  }
  const tree = renderer
    .create(<Main {...props} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});