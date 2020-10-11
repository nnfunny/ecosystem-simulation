import * as THREE from "three";

export default function detectCollision(globalVar) {
  // Raycaster for jumping
  globalVar.onObjectRay.ray.origin.copy(
    globalVar.controls.getObject().position
  );
  globalVar.onObjectRay.ray.origin.y -= 10;
  let intersections = globalVar.onObjectRay.intersectObjects(
    globalVar.collidableMeshList
  );
  let onObject = intersections.length > 0;

  // Jumping
  if (onObject === true) {
    globalVar.velocity.y = Math.max(0, globalVar.velocity.y);
    globalVar.move.canJump = true;
  } else {
    // Collision with other objects
    globalVar.visitor.position.copy(globalVar.controls.getObject().position);
    let originPoint = globalVar.visitor.position.clone();
    // console.log(originPoint);
    for (
      let vertexIndex = 0;
      vertexIndex < globalVar.visitor.geometry.vertices.length;
      vertexIndex++
    ) {
      let localVertex = globalVar.visitor.geometry.vertices[
        vertexIndex
      ].clone();
      let globalVertex = localVertex.applyMatrix4(globalVar.visitor.matrix);
      let directionVector = globalVertex.sub(globalVar.visitor.position);

      let ray = new THREE.Raycaster(
        originPoint,
        directionVector.clone().normalize()
      );
      let collisionResults = ray.intersectObjects(
        globalVar.collidableMeshList,
        true
      );
      if (
        collisionResults.length > 0 &&
        collisionResults[0].distance < directionVector.length()
      ) {
        // console.log(collisionResults);
        globalVar.velocity.x = Math.max(0, globalVar.velocity.x);
        globalVar.velocity.z = Math.max(0, globalVar.velocity.z);
      }
    }
  }
}
