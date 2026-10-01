export const getIdCardView = (width: number, height: number) => {
  const aspect = Math.max(width, 1) / Math.max(height, 1)
  const visibleHeight = Math.max(11, 8 / aspect)

  return {
    depth: visibleHeight / (2 * Math.tan(Math.PI / 18)),
    halfWidth: (visibleHeight * aspect) / 2,
    halfHeight: visibleHeight / 2
  }
}
