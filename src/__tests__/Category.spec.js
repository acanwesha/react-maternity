import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Category from '../components/Category';


describe('components/Category', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = render(<Category {...props} />)
  }

  const updateProps = () => {
    render(<Category {...props} />, {
      container: wrapper.container
    })
  }

  const getDisplayNameLabel = () => wrapper.container.querySelector('[data-testid="displayName"]')

  beforeEach(() => {
    props = {
      category: {
        result: [
          {
            id: 1,
            displayName: "sub-category 1",
            value: 10
          }, {
            id: 2,
            displayName: "sub-category 2",
            value: 20
          }
        ],
        displayName: "Test"
      },
      categoryIndex: 0,
      setSelectedCategory: jest.fn(),
      selectedCategory: 0,
      finalCategoryArray: [],
      methods: {
        setCategoryArray: jest.fn(),
      }
    }
  })

  it('should renders correctly', () => {
    setup();
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render correctly when item is empty object', () => {
    props.category.result[0] = {}
    setup();
    expect(wrapper.container).toMatchSnapshot();
  })

  it('should handle check/uncheck category correctly', () => {
    setup();

    //Check
    fireEvent.click(wrapper.container.querySelector('input[data-name="category-checkbox"]'))

    expect(props.methods.setCategoryArray).toHaveBeenCalledWith([{
      displayName: "Test",
    }]);
    // All sub-category checkboxes are not disabled
    wrapper.container.querySelectorAll('input[data-name="sub-category-checkbox"]').forEach(checkbox => expect(checkbox).not.toBeDisabled())

    // category is added
    props.finalCategoryArray = [
      {
        displayName: "Test",
        result: []
      }
    ]
    updateProps();

    //Uncheck
    fireEvent.click(wrapper.container.querySelector('input[data-name="category-checkbox"]'))
    expect(props.methods.setCategoryArray).toHaveBeenCalledWith([]);

    // All sub-category checkboxes are disabled
    wrapper.container.querySelectorAll('input[data-name="sub-category-checkbox"]').forEach(checkbox => expect(checkbox).toBeDisabled())
  })

  it('should collapse/expand category correctly in case current category is selected', async () => {
    setup();
    // the category is selected initially
    expect(document.querySelectorAll('.collapse.show')).toHaveLength(1)
    fireEvent.click(getDisplayNameLabel())
    await new Promise((r) => setTimeout(r, 300)); // wait for animation
    expect(document.querySelectorAll('.collapse.show')).toHaveLength(0)
    fireEvent.click(getDisplayNameLabel())
    await new Promise((r) => setTimeout(r, 300)); // wait for animation
    expect(document.querySelectorAll('.collapse.show')).toHaveLength(1)
  });

  it('should collapse if the category is not selected', () => {
    setup();
    // the category is selected initially
    expect(document.querySelectorAll('.collapse.show')).toHaveLength(1)
    props.selectedCategory = 1;
    updateProps();
    expect(document.querySelectorAll('.collapse.show')).toHaveLength(0)
  })

  it('should handle check/uncheck sub-category correctly', () => {
    // category is added
    props.finalCategoryArray = [
      {
        displayName: "Test",
        result: []
      }
    ]
    
    setup();
    fireEvent.click(wrapper.container.querySelector('input[data-name="category-checkbox"]'))

    //Check first sub-category
    fireEvent.click(wrapper.container.querySelector('input[data-name="sub-category-checkbox"]'));
    expect(props.methods.setCategoryArray).toHaveBeenCalledWith([{
      result: [
        {
          displayName: "sub-category 1",
          value: 10
        }
      ],
      displayName: "Test"
    }]);
    fireEvent.click(wrapper.container.querySelector('input[data-name="sub-category-checkbox"]'));
    wrapper.container.querySelector('input[data-name="sub-category-checkbox"]').checked = true
    expect(props.methods.setCategoryArray).toHaveBeenCalledWith([{
      result: [],
      displayName: "Test"
    }]);

    // uncheck category
    fireEvent.click(wrapper.container.querySelector('input[data-name="category-checkbox"]'))
    expect(wrapper.container.querySelector('input[data-name="sub-category-checkbox"]').checked).toBe(false)
  })
})