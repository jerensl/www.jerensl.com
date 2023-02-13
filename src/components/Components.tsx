import React from 'react'
import { pre } from './Pre'
import { CopyToClipboard } from './CopyClipboard'
import Link from 'next/link'

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
    h1: ({ children }: any) => {
        return <h2 className="text-xl">{children}</h2>
    },
    h2: ({ children }: any) => {
        return <h2 className="text-lg">{children}</h2>
    },
    h3: ({ children }: any) => {
        return <h2 className="text-lg">{children}</h2>
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
            <Link
                className="text-bold underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
                href={href}
            >
                {children}
            </Link>
        )
    },
}

export { components }
