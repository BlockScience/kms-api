import { schema } from './schema.js'
import fs from 'fs'

const TEMPLAT_FILE = 'src/parsers/grammar-template.pegjs'
const OUTPUT_FILE = 'src/parsers/grammar-generated.pegjs'
const REPLACE = '//[REPLACE ME]//'
const MAP = {
  string: 'StringFields',
  float: 'NumberFields',
  int32: 'NumberFields',
  'string[]': 'ArrayFields',
}

const fields = {}
for (const field of schema.fields) {
  const grammarRule = MAP[field.type]
  if (!fields[grammarRule]) {
    fields[grammarRule] = []
  }
  fields[grammarRule].push(field.name)
}
let insert = Object.entries(fields)
  .map(([rule, fields]) => `${rule} = ${fields.map((f) => `"${f}"`).join(' / ')}`)
  .join('\n')

console.log(`"""\n${insert}\n"""\n`)

const template = fs.readFileSync(TEMPLAT_FILE, 'utf-8')
if (!template.includes(REPLACE)) {
  throw new Error(`Could not find ${REPLACE} in ${TEMPLAT_FILE}`)
}
fs.writeFileSync(OUTPUT_FILE, template.replace(REPLACE, insert), 'utf8')

console.log(`DONE generating grammar ${OUTPUT_FILE}`)
