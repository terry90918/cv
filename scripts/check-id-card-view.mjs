import assert from 'node:assert/strict'

import { PerspectiveCamera, Vector3 } from 'three'

import { getIdCardView } from '../src/lib/id-card-view.ts'

for (const [width, height] of [[288, 480], [358, 480], [464, 560], [448, 560], [489, 560], [978, 400]]) {
  const view = getIdCardView(width, height)
  const camera = new PerspectiveCamera(20, width / height, 0.1, 100)

  camera.position.set(0, 0, view.depth)
  camera.updateMatrixWorld()

  for (const point of [[-3.5, -3.5, 0], [3.5, 4.95, 0], [0, 4, 0]]) {
    const projected = new Vector3(...point).project(camera)

    assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1, `${width}x${height}: rig must fit the view`)
  }

  const left = new Vector3(-1.43, -0.7, 0).project(camera)
  const right = new Vector3(1.43, -0.7, 0).project(camera)
  const pixelWidth = ((right.x - left.x) * width) / 2

  assert.ok(pixelWidth >= 100, `${width}x${height}: card must remain large enough to grab`)
  assert.ok(pixelWidth <= width - 32, `${width}x${height}: card must have horizontal space`)
}

console.log('Badge rig fits narrow, desktop and landscape views with usable card width.')
