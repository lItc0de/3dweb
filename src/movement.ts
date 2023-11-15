export const addMovement = (object: THREE.BoxGeometry) => {
  // movement - please calibrate these values
  const xSpeed = 0.0001;
  const ySpeed = 0.0001;

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event: KeyboardEvent) {
    const keyCode = event.which;
    if (keyCode == 87) {
      object.position.y += ySpeed;
    } else if (keyCode == 83) {
      object.position.y -= ySpeed;
    } else if (keyCode == 65) {
      object.position.x -= xSpeed;
    } else if (keyCode == 68) {
      object.position.x += xSpeed;
    } else if (keyCode == 32) {
      object.position.set(0, 0, 0);
    }
  }
};
