import '@testing-library/jest-dom'
import * as React from 'react'
import renderer from 'react-test-renderer';
import { Patient } from '../components/Patient';
import { render, screen } from '@testing-library/react'
const patient = {
  "firstName": "EMMA",
  "lastName": "ESPINOSA",
  "mrn": "test",
  "fin": "test 2u"
}

describe('Patient', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Patient patient={patient} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("show props correctly", () => {
    render(<Patient patient={patient} />)
    expect(screen.getByTestId('name')).toHaveTextContent(`${patient.firstName} ${patient.lastName}`)
    expect(screen.getByTestId('mrn')).toHaveTextContent(patient.mrn)
    expect(screen.getByTestId('fin')).toHaveTextContent(patient.fin)
  })
})