import CONSTANTS from "./contants";

export function onKeyDown(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true;
      break;

    case 37: // left
    case 65: // a
      moveLeft = true;
      break;

    case 40: // down
    case 83: // s
      moveBackward = true;
      break;

    case 39: // right
    case 68: // d
      moveRight = true;
      break;

    case 32: // space
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
}
export function onKeyUp(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false;
      break;

    case 37: // left
    case 65: // a
      moveLeft = false;
      break;

    case 40: // down
    case 83: // s
      moveBackward = false;
      break;

    case 39: // right
    case 68: // d
      moveRight = false;
      break;
  }
}
export function onWindowResize() {
  renderer.setSize(CONSTANTS.SCREEN_WIDTH, CONSTANTS.SCREEN_HEIGHT);

  camera.aspect = CONSTANTS.SCREEN_WIDTH / CONSTANTS.SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
}
