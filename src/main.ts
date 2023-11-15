import "./style.css";
import * as THREE from "three";
// import { MMDPhysics } from "three/addons/animation/MMDPhysics.js";
import { randomColor } from "./helpers";

// const SPEED = 0.3;
const SIZE = 30;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

scene.background = new THREE.Color(0xf4cccc);

// const clock = new THREE.Clock();

// Light
const light = new THREE.AmbientLight(0xf4cccc, 2);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xdb5d7c, 1.5); // soft white light
scene.add(ambientLight);

// class Light {
//   group: THREE.Group;
//   light: THREE.PointLight;

//   constructor(color: THREE.ColorRepresentation, rad: number) {
//     this.group = new THREE.Group();
//     this.light = new THREE.PointLight(color, 70, 300);
//     this.light.position.set(rad, 0, 0);
//     this.group.add(this.light);
//   }
// }

// class Lights {
//   group: THREE.Group;
//   lights: Light[] = [];

//   constructor(num: number, rad: number) {
//     this.group = new THREE.Group();

//     for (let index = 0; index < num; index++) {
//       const light = new Light(randomColor(), rad);
//       this.lights.push(light);
//       this.group.add(light.group);

//       light.group.rotation.y = (index * Math.PI) / (num / 2);
//       light.group.rotation.x = Math.random() * 2 * Math.PI;

//       this.group.rotation.x = Math.random() * Math.PI;
//     }
//   }

//   animate(elapsedTime: number) {
//     this.group.rotation.x += Math.sin(elapsedTime) * 0.03 * Math.PI * SPEED;
//     this.group.rotation.y += Math.sin(elapsedTime) * 0.03 * Math.PI * SPEED;
//   }
// }

// const lights1 = new Lights(10, 12);
// scene.add(lights1.group);

// const lights2 = new Lights(10, 17);
// scene.add(lights2.group);

// const lights3 = new Lights(10, 22);
// scene.add(lights3.group);

// Objects
// const sphereGeometry1 = new THREE.SphereGeometry(2, 20, 20);

// const spereMaterial1 = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   roughness: 0,
//   metalness: 0.1,
// });

// const sphere1 = new THREE.Mesh(sphereGeometry1, spereMaterial1);
// scene.add(sphere1);

class Planet {
  group: THREE.Group;
  mesh: THREE.Mesh;

  constructor() {
    const materialParameters = {
      color: randomColor(),
      roughness: 0,
      metalness: 0.1,
    };
    const geometry = new THREE.SphereGeometry(2, 20, 20);
    const material = new THREE.MeshStandardMaterial(materialParameters);

    this.group = new THREE.Group();
    this.mesh = new THREE.Mesh(geometry, material);
    // this.mesh.position.x = rad;
    this.group.add(this.mesh);
  }
}

class Planets {
  innerGroup: THREE.Group;
  outerGroup: THREE.Group;
  planets: Planet[] = [];

  constructor(num: number) {
    this.innerGroup = new THREE.Group();
    this.outerGroup = new THREE.Group();

    for (let index = 0; index < num; index++) {
      const planet = new Planet();
      this.planets.push(planet);
      this.innerGroup.add(planet.group);

      const size = SIZE;
      planet.group.position.x = -size + ((size * 2) / (num - 1)) * index;

      // planet.mesh.position.y = (window.innerWidth / num) * index;
      // planet.group.position.y = -5;

      // planet.group.rotation.y = (index * Math.PI) / (num / 2);
      // planet.group.rotation.x = Math.random() * 3;
    }

    this.outerGroup.add(this.innerGroup);
  }
}

const planetGroup1 = new Planets(9);
scene.add(planetGroup1.outerGroup);
// planetGroup1.innerGroup.rotation.y += 0.9;
// planetGroup1.outerGroup.rotation.z = 0.5 * Math.PI;

// const planetGroup2 = new Planets(10, 15);
// scene.add(planetGroup2.outerGroup);

// const planetGroup3 = new Planets(10, 20);
// scene.add(planetGroup3.outerGroup);
// planetGroup3.innerGroup.rotation.y -= 1.4;
// planetGroup3.outerGroup.rotation.z += 0.5;

class Player {
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.SphereGeometry(2, 20, 20);
    const material = new THREE.MeshStandardMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = -(SIZE - 2.5);
    this.mesh.position.y = 5;
    // new MMDPhysics(this.mesh.);
  }
}

const player = new Player();
scene.add(player.mesh);

// Helpers
// const helpers = new Helpers(camera, renderer.domElement, scene);

// const cubeFolder = helpers.gui.addFolder("Cube");
// // cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// // cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// // cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open();
// const cameraFolder = helpers.gui.addFolder("Camera");
// cameraFolder.add(camera.position, "z", 0, 10);
// cameraFolder.open();

camera.position.z = 30;

function animate() {
  // const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);

  // planetGroup1.innerGroup.rotation.y +=
  //   Math.sin(elapsedTime) * 0.03 * Math.PI * SPEED;
  // planetGroup1.outerGroup.rotation.z +=
  //   Math.cos(elapsedTime) * 0.03 * Math.PI * SPEED;

  // planetGroup2.innerGroup.rotation.y -=
  //   Math.cos(elapsedTime) * 0.02 * Math.PI * SPEED;
  // planetGroup2.outerGroup.rotation.z -=
  //   Math.sin(elapsedTime) * 0.02 * Math.PI * SPEED;

  // planetGroup3.innerGroup.rotation.y +=
  //   Math.sin(elapsedTime) * 0.03 * Math.PI * SPEED;
  // planetGroup3.outerGroup.rotation.z +=
  //   Math.cos(elapsedTime) * 0.03 * Math.PI * SPEED;

  // lights1.animate(elapsedTime);
  // lights2.animate(elapsedTime);
  // lights3.animate(elapsedTime);

  // helpers.update();
  renderer.render(scene, camera);
}

animate();
