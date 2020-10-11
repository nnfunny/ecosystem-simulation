import { Trees } from "../../components";
import CONSTANTS from "../../utils/contants";

export default function loadTree(globalVar) {
  let trees = Trees(CONSTANTS.N_TREE);
  trees.forEach((tree) => {
    tree.castShadow = true;
    globalVar.scene.add(tree);
    globalVar.collidableMeshList.push(tree);
  });
}
