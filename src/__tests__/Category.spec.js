import React from 'react'
import renderer from 'react-test-renderer';
import Category from '../components/Category';
import { render, screen } from '@testing-library/react'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  category: {
    result: [],
    displayName: "Test"
  },
  categoryIndex: 0,
  setSelectedCategory: () => { },
  selectedCategory: 0,
  finalCategoryArray: [],
  methods: {
    setCategoryArray: () => { },
  }
}

describe('Category', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<Category {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("show props correctly", () => {
    render(<Category {...props} />)
    expect(screen.getByTestId('displayName')).toHaveTextContent(props.category.displayName)
  })
 
})