export default function getDistance(objA, objB) {
  let squareX = Math.pow(objA.position.x - objB.position.x, 2);
  let squareY = Math.pow(objA.position.y - objB.position.y, 2);
  let squareZ = Math.pow(objA.position.z - objB.position.z, 2);
  return Math.sqrt(squareX + squareY + squareZ);
}
