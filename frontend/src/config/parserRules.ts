import { ProcessNodeDefinitions } from 'html-to-react'

export const MARK_NODE_TYPE = 'mark'

// TODO: use this to fix parsing bug thats breaking some search pages
export const HTML_PARSER_RULES = [
  {
    shouldProcessNode: function (node) {
      return node.type === MARK_NODE_TYPE
    },
    processNode: function (node, children) {
      return node.data.toUpperCase()
    },
  },
  {
    // Anything else
    shouldProcessNode: function (node) {
      return true
    },
    processNode: ProcessNodeDefinitions().processDefaultNode,
  },
]
