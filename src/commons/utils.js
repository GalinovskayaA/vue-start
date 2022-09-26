export const nextUntil = (element, endClass) => {
  const findElements = [element]

  element = element.nextElementSibling

  while (element) {
    if (element.matches(endClass)) {
      findElements.push(element)
      break
    }
    findElements.push(element)
    element = element.nextElementSibling
  }

  return findElements
}