import { render } from '@testing-library/react'
import { Switch } from './Switch'

describe('Switch', () => {
  it('Switch should render successfully', () => {
    const { baseElement } = render(<Switch label='Switch' />)

    expect(baseElement).toBeTruthy()
  })
})
