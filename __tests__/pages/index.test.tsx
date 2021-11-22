/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

jest.mock(
    'next/image',
    () =>
        function Image({ src, alt }) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} />
        }
)

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Jerens Lensun/i,
        })
        const subHeading = screen.getByText('Software Engineer')

        expect(heading).toBeInTheDocument()
        expect(subHeading).toBeInTheDocument()
    })
})
