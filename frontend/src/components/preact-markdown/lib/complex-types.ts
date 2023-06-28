// import type {ReactNode, ComponentType, ComponentPropsWithoutRef} from 'react'
// import type { Position } from 'unist'
// import type { Element } from 'hast'
import { VNode, JSX, ComponentType } from 'preact'

/* File for types which are not handled correctly in JSDoc mode */

export type ReactMarkdownProps = {
  node: Element
  children: VNode[]
  /**
   * Passed when `options.rawSourcePos` is given
   */
  sourcePosition?
  /**
   * Passed when `options.includeElementIndex` is given
   */
  index?: number
  /**
   * Passed when `options.includeElementIndex` is given
   */
  siblingCount?: number
}

export type NormalComponents = {
  [TagName in keyof JSX.IntrinsicElements]:
    | keyof JSX.IntrinsicElements
    // @ts-ignore
    | ComponentType<ComponentPropsWithoutRef<TagName> & ReactMarkdownProps>
}
