export default function toCSSVariables(object) {
  return (
    Object.keys(object).reduce((acc, key) => {
      acc[`--${ key }`] = object[key]
      return acc
    }, {})
  )
}
