export function DateFn (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}
