import { createUseExternalEvents } from '@mantine/utils'
import type { SpotlightAction } from './types'

export type SpotlightEvents = {
  open(): void
  close(): void
  toggle(): void
  openWithQuery(query: string): void
  triggerAction(id: string): void
  registerActions(actions: SpotlightAction[]): void
  removeActions(ids: string[]): void
}

export const [useSpotlightEvents, createEvent] =
  createUseExternalEvents<SpotlightEvents>('mantine-spotlight')

export const openSpotlight = createEvent('open')
export const closeSpotlight = createEvent('close')
export const toggleSpotlight = createEvent('toggle')
export const openSpotlightWithQuery = createEvent('openWithQuery')
export const triggerSpotlightAction = createEvent('triggerAction')
export const registerSpotlightActions = createEvent('registerActions')
export const removeSpotlightActions = createEvent('removeActions')

export const spotlight = {
  open: openSpotlight,
  close: closeSpotlight,
  toggle: toggleSpotlight,
  openWithQuery: openSpotlightWithQuery,
  triggerAction: triggerSpotlightAction,
  registerActions: registerSpotlightActions,
  removeActions: removeSpotlightActions,
}
