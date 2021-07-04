import { shallow } from 'enzyme';
import { Patient } from '../components/Patient';

describe('components/Patient', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Patient {...props} />)
  }

  beforeEach(() => {
    props = {
      patient: {
        "firstName": "EMMA",
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