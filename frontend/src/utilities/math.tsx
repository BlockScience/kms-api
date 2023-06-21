type ConditionFunction = (obj: any) => boolean
export function closestWithCondition(
  arr: any[],
  startIndex: number,
  condition: ConditionFunction,
): number | null {
  if (startIndex < 0 || startIndex >= arr.length) {
    throw new Error('Invalid start index.')
  }

  let left = startIndex - 1
  let right = startIndex + 1
  let match = null

  while (left >= 0 || right < arr.length) {
    if (right < arr.length) {
      match = condition(arr[right]) ? right : null
      if (match) {
        return match
      }
      right++
    }
    if (left >= 0) {
      match = condition(arr[left]) ? left : null
      if (match) {
        return match
      }
      left--
    }
  }
  return null
}
