export function astToString(node, root = false) {
  let left, right
  switch (node.type) {
    case 'expression':
      return astToString(node.value)

    case 'or':
      left = astToString(node.left)
      right = astToString(node.right)
      if (root) return `${left} || ${right}`
      return `(${left} || ${right})`

    case 'and':
      left = astToString(node.left)
      right = astToString(node.right)
      return `${left} && ${right}`

    case 'string':
    case 'array':
    case 'number':
      return `${node.field}:${astToString(node.value)}`

    case 'comparison':
      return `${node.operator}${astToString(node.value)}`

    case 'equality':
      return `=${astToString(node.value)}`

    case 'range':
      return `[${node.min}..${node.max}]`

    case 'list':
      return `[${node.values.map(astToString).join(', ')}]`

    case 'term':
      return node.value

    case 'parenthesized':
      return `(${astToString(node.value)})`

    default:
      if (!node.values) {
        return node.toString()
      } else {
        console.log('node:\n', node)
        throw new Error(`Unsupported node type: ${node.type}`)
      }
  }
}
