import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

export const randomColor = () => {
  const color = new THREE.Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);
  return color;
};

export class Helpers {
  private camera: THREE.Camera;
  private domElement: HTMLCanvasElement;
  private scene: THREE.Scene;
  private stats: Stats;
  private statsEl: HTMLElement;

  controls: OrbitControls;
  gui: GUI;
  axesHelper: THREE.AxesHelper;
  gridHelper: THREE.GridHelper;
  visible = true;

  constructor(
    camera: THREE.Camera,
    domElement: HTMLCanvasElement,
    scene: THREE.Scene
  ) {
    this.camera = camera;
    this.domElement = domElement;
    this.scene = scene;

    this.controls = this.initControls();
    this.gui = this.initGui();
    [this.stats, this.statsEl] = this.initStats();
    this.gridHelper = this.initGridHelper();
    this.axesHelper = new THREE.AxesHelper(30);

    this.init();
  }

  init() {
    this.scene.add(this.axesHelper);
    this.camera.position.set(0, 20, 100);

    this.toggleHelpers();

    this.addToggleEventListener();
  }

  initControls(): OrbitControls {
    return new OrbitControls(this.camera, this.domElement);
  }

  initGui(): GUI {
    const gui = new GUI();
    return gui;
  }

  initStats(): [Stats, HTMLElement] {
    const stats = Stats();
    const statsEl = document.body.appendChild(stats.dom);
    return [stats, statsEl];
  }

  initGridHelper(): THREE.GridHelper {
    const gridHelper = new THREE.GridHelper(30, 30);
    this.scene.add(gridHelper);
    return gridHelper;
  }

  update() {
    this.controls.update();
    this.stats.update();
  }

  toggleHelpers() {
    if (this.visible) {
      this.statsEl.style.display = "none";
      this.gui.hide();
      this.axesHelper.visible = false;
      this.gridHelper.visible = false;
      this.visible = false;
    } else {
      this.statsEl.style.display = "block";
      this.gui.show();
      this.axesHelper.visible = true;
      this.gridHelper.visible = true;
      this.visible = true;
    }
  }

  addToggleEventListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "t") {
        this.toggleHelpers();
      }
    });
  }
}
