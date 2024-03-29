import React from 'react'
import { pre } from '../styles/code'
import { CopyToClipboard } from './CopyClipboard'
import { StandardLink } from './links/StandardLink'

interface Components {
    children?: React.ReactNode
    theme?: 'pink' | 'turq' | 'orange'
    showlinenumbers?: any
}

const components = {
    pre: ({ children, theme, showlinenumbers }: Components) => {
        return (
            <CopyToClipboard>
                <pre
                    className={pre({
                        theme,
                        showlinenumbers: typeof showlinenumbers === 'string',
                        css: {
                            mx: '-$3',
                            mt: '$3',
                            mb: '$4',

                            '[data-preview] + &': {
                                marginTop: '0',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            },

                            '@bp1': {
                                mx: 0,
                                borderRadius: '$3',
                            },
                        },
                    })}
                >
                    {children}
                </pre>
            </CopyToClipboard>
        )
    },
    h2: ({ children, id }: any) => {
        return (
            <h2 id={id} className="text-lg scroll-mt-20">
                {children}
            </h2>
        )
    },
    h3: ({ children, id }: any) => {
        return (
            <h3 id={id} className="text-base scroll-mt-20">
                {children}
            </h3>
        )
    },
    h4: ({ children, id }: any) => {
        return (
            <h4 id={id} className="text-sm scroll-mt-20">
                {children}
            </h4>
        )
    },
    blockquote: ({ children }: any) => {
        return (
            <div className="px-4 border-l-4 border-l-red-500 font-bold italic">
                {children}
            </div>
        )
    },
    a: ({ children, href }: any) => {
        return (
            <StandardLink href={href} isExternal={true}>
                {children}
            </StandardLink>
        )
    },
}

export { components }
