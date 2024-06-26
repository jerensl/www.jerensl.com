import { visit } from 'unist-util-visit'
import parseNumericRange from 'parse-numeric-range'
import { toString } from 'hast-util-to-string'
import { refractor } from 'refractor'
import highlightLine from './rehype-highlight-line'
import highlightWord from './rehype-highlight-word'
import type { Visitor } from 'unist-util-visit/complex-types'
import type { Plugin } from 'unified'
import type { Element } from 'hast'
import { Nodes } from 'hast-util-to-string/lib'

function rehypeHighlightCode(options = {}): Plugin {
    const visitor: Visitor<Element, Element> = (
        node: Element,
        _index: number | null,
        parentNode: Element | null
    ) => {
        if (parentNode?.tagName === 'pre' && node.tagName === 'code') {
            // syntax highlight
            const lang = node.properties?.className
                ? (node.properties.className as string[])[0].split('-')[1]
                : 'go'

            const registeredLanguages = refractor.listLanguages()
            if (!registeredLanguages.includes(lang)) return

            const result = refractor.highlight(toString(node as Nodes), lang)

            const range = node.properties?.line || '0'

            // line highlight
            const linesToHighlight = parseNumericRange(range as string)
            const currentHighlightLine = highlightLine(result, linesToHighlight)

            // word highlight
            let highlightedWord
            const shouldIgnoreWordHighlight =
                typeof node.properties?.ignoreWordHighlight !== 'undefined'
            if (!shouldIgnoreWordHighlight) {
                highlightedWord = highlightWord(currentHighlightLine)
            }

            if (highlightedWord) {
                node.children = highlightedWord
            }
        }
    }

    return (tree: Element) => {
        visit(tree, 'element', visitor)
    }
}

export default rehypeHighlightCode
