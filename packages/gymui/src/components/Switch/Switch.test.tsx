import { render } from '@testing-library/react'
import { Switch } from './Switch'

describe('Switch', () => {
  it('Switch should render successfully', () => {
    const messageClick = jest.fn()
    const { baseElement } = render(<Switch label='Switch' />)

    expect(baseElement).toBeTruthy()
    expect(messageClick).toHaveBeenCalled()
  })
})
