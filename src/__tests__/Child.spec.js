import { shallow } from 'enzyme';
import { Child } from '../components/Child';

describe('components/Child', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Child {...props} />)
  }

  beforeEach(() => {
    props = {
      child: {
        "firstName": "AARAV",
        "lastName": "ESPINOSA",
        "mrn": "test",
        "fin": "test 2u"
      },
      loading: false
    }
  })


  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly while loading', () => {
    props.loading = true
    setup();
    expect(wrapper).toMatchSnapshot();
  })
})
