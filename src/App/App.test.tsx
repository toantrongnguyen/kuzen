import React from 'react'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
import App from '.'
import axios from 'axios'

jest.mock('axios')

describe(('On test App'), () => {
  afterEach(cleanup)

  test('should match snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should display input changes when user typing and request api', async (done) => {
    const { getByLabelText } = render(<App />)
    const input = getByLabelText('username-input') as HTMLInputElement
    await act(async () => {
      fireEvent.change(input, { target: { value: 'hi' } })
    })
    expect(input.value).toBe('hi')
    setTimeout(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      done()
    }, 1000)
  })
})
