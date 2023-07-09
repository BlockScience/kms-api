import { astToString } from './stringify.js'
import { parser } from './parser-11.js'

const input = 'rank =1 & rank>1 | rank<10'
const ast = parser.parse(input)
const str = astToString(ast, true)

console.log('input:\n', input)
console.log('output:\n', str)
console.log('ast:\n', ast)
