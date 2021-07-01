import renderer from 'react-test-renderer';
import { Child } from '../components/Child';

it('renders correctly', () => {
  const patient = {
    "firstName": "Erhan",
    "lastName": "Namal",
    "mrn": "test",
    "fin": "test 2u"
  }

  const tree = renderer
    .create(<Child child={patient} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});