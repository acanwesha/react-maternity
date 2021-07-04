import axios from 'axios';
import { render, fireEvent, screen } from '@testing-library/react'
import { Main } from '../components/Main';

jest.mock('axios');

describe('components/Main', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = render(<Main {...props} />)
  }

  // const updateProps = () => {
  //   render(<Main {...props} />, {
  //     container: wrapper.container
  //   })
  // }

  beforeEach(async () => {
    props = {
      match: {
        params: {
          id: 1
        }
      }
    }

    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        patient: [
          {
            patientDetails: {}
          }
        ],
        child: [
          {
            childDetails: [
              {
                id: 1,
                firstName:'A',
                lastName: 'B',
                resultCopiedDateTime: '2021-07-02T13:00:00'
              },
              {
                id: 2,
                firstName:'C',
                lastName: 'D',
                resultCopiedDateTime: undefined
              }
            ]
          }
        ],
        category: [
          {
            displayName: 'Category 1',
            result: []
          },
          {
            displayName: 'Category 2',
            result: []
          }
        ]
      }
    }));
    setup();
    await new Promise(setImmediate)
  })

  it('should render correctly', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should handle copying result correctly', () => {
    window.alert = jest.fn()
    fireEvent.click(document.querySelector('button'));
    fireEvent.click(screen.getByText('Baby B'));

    // No category has been selected yet
    fireEvent.click(screen.getByText('Result Copy'));
    expect(window.alert).toHaveBeenCalledWith('Select category!.');

    // Select a category
    fireEvent.click(document.querySelector('[data-name="category-checkbox"]'));
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    fireEvent.click(screen.getByText('Result Copy'));
    expect(axios.post.mock.calls[0][1].childId).toEqual(2)
    expect(axios.post.mock.calls[0][1].category).toEqual([{"displayName": "Category 1"}])
  });
})
