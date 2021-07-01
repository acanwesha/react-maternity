import renderer from 'react-test-renderer';
import AllCategory from '../components/AllCategories';

it('renders correctly', () => {
  const props = { data: [], methods: {}, finalCategoryArray: [] }
  const tree = renderer
    .create(<AllCategory {...props} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});