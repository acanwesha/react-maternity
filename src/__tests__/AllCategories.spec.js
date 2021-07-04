import { shallow } from 'enzyme';
import AllCategory from '../components/AllCategories';
import Category from '../components/Category';


describe('components/AllCategories', () => {
 let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<AllCategory {...props} />)
  }

  beforeEach(() => {
    props = {
      data: [
        {
          id: 1
        },
        {
          id: 2
        }
      ], methods: {}, finalCategoryArray: []
    }
  })

  it('should renders correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no categories available', () => {
    props.data = [];
    setup();
    expect(wrapper).toMatchSnapshot();
  })

  it('should handle setting selectedCategory correctly', () => {
    setup();
    expect(wrapper.find(Category).first().props().selectedCategory).toEqual(-1)
    wrapper.find(Category).first().props().setSelectedCategory(1);
    expect(wrapper.find(Category).first().props().selectedCategory).toEqual(1)
  })
})
