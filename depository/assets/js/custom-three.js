import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const colors = {
  "apple-green": 0x93c422,
  beige: 0xffe87a,
  black: 0x181914,
  " blue": 0x0072c1,
  brown: 0x664826,
  coffee: 0x824701,
  "forest-green": 0x2f5130,
  green: 0x2f5130,
  grey: 0x7a7b6d,
  "lemon-yellow": 0xedef53,
  "lt-blue": 0x87ceeb,
  "lt-tea": 0x9b582b,
  "lt-grey": 0xa1a783,
  navy: 0x141476,
  "neon-yellow": 0xedef53,
  orange: 0xe38104,
  pink: 0xff1493,
  purple: 0x4b3949,
  red: 0xb52218,
  "royal-blue": 0x08176c,
  teal: 0x008080,
  toffee: 0x864c24,
  white: 0xfefefe,
  wine: 0x722f37,
  yellow: 0xd39506,
  "vegas-gold": 0xc5b358,
  "yellow-gold": 0xffdf00,
  silver: 0xc0c0c0,
  none: "none",
};
// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.getElementById("myThreeJSScene");
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create ground plane
const groundSize = 0.5;
const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize); // Adjust the size as needed
const groundMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  opacity: 0.2,
  depthWrite: false,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal
ground.rotation.x = -Math.PI / 2;

// Position the ground so it's under your model
ground.position.y = -0.25; // Just slightly below the origin to avoid z-fighting with the model

// Enable shadows for the ground
ground.receiveShadow = true;

// Add the ground to the scene
//scene.add(ground);

// Add lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
//scene.add(hemiLightHelper);

/**Directional lights 1 */
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(1, 1.75, -1);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;

/**Directional lights 2 */
const dirLight2 = new THREE.DirectionalLight(0xffffff, 3);
dirLight2.color.setHSL(0.1, 1, 0.95);
dirLight2.position.set(-1, 1.75, 1);
dirLight2.position.multiplyScalar(30);
scene.add(dirLight2);

dirLight2.castShadow = true;

dirLight2.shadow.mapSize.width = 2048;
dirLight2.shadow.mapSize.height = 2048;

const d2 = 50;

dirLight2.shadow.camera.left = -d;
dirLight2.shadow.camera.right = d;
dirLight2.shadow.camera.top = d;
dirLight2.shadow.camera.bottom = -d;

dirLight2.shadow.camera.far = 3500;
dirLight2.shadow.bias = -0.0001;

/**Directional lights 3 */
const dirLight3 = new THREE.DirectionalLight(0xffffff, 1);
dirLight3.color.setHSL(0.1, 1, 0.95);
dirLight3.position.set(-1, -1.75, 1);
dirLight3.position.multiplyScalar(30);
scene.add(dirLight3);

dirLight3.castShadow = true;

dirLight3.shadow.mapSize.width = 2048;
dirLight3.shadow.mapSize.height = 2048;

const d3 = 50;

dirLight3.shadow.camera.left = -d;
dirLight3.shadow.camera.right = d;
dirLight3.shadow.camera.top = d;
dirLight3.shadow.camera.bottom = -d;

dirLight3.shadow.camera.far = 3500;
dirLight3.shadow.bias = -0.0001;

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};
// Load model
const loader = new GLTFLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.preload();
dracoLoader.setDecoderPath( 'https://cdn.jsdelivr.net/gh/phantomodm/nystixCDN@9P/depository/assets/js/decoder/' );
//loader.setDRACOLoader( new THREE.DRACOLoader() );
dracoLoader.setDecoderConfig( { type: 'js' } );
loader.setDRACOLoader( dracoLoader );
let model;
loader.load(
  "https://cdn.jsdelivr.net/gh/phantomodm/nystixCDN@9P/depository/assets/images/glb/infield_3_draco.gltf",
  (gltf) => {
    function updateColor(id, colorCode) {
      scene.traverse((object) => {
        if (object.isMesh) {
          if (object.material.name === id) {
            if (
              object.material.name === "9p_logo_outline" &&
              object.visible === false
            ) {
              if (typeof colorCode === "string" && colorCode === "none") {
                object.visible = false;
              }
              object.visible = true;
            }
            object.material.color.set(Number(colorCode.toString()));
            object.material.emissive.set(Number(colorCode.toString()));
          }
        }
      });
    }
    const scale = .08;
    model = gltf.scene;
    model.scale.set(scale, scale, scale);
    model.castShadow = true;
    model.receiveShadow = true;

    const modelBox = new THREE.Box3().setFromObject(model);
    const modelCenter = modelBox.getCenter(new THREE.Vector3());
    model.position.sub(modelCenter);

    // // Make the model reflective
    // const reflectiveMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xffffff,
    //   metalness: 1, // Make it highly reflective
    //   roughness: 0.1, // Adjust roughness as needed
    // });

    model.traverse((child) => {
      if (child.isMesh) {
        switch (child.material.name) {
          case "n_logo_main":
          case "n_logo_outline":
          case "ny_logo_main":
          case "ny_logo_outline":
          case "9p_logo_outline":
            child.visible = false;
            break;
          case "9p_logo_main":
          case "9p_rise":
          case "web_graphic":
            child.material.color.set(Number(0xc6a82d));
            break;
          default:
            child.material.color.set(Number(0x202020));
            break;
        }
      }
    });

    scene.add(model);
    updateScale();

    materialIsVisible(mesh){
      model.traverse( (child) => {
        if(child.isMesh && child.material.name === mesh){
          return child.visible
        }
      })
    }

    // Set camera position and target
    const modelBoundingSphere = new THREE.Sphere();
    modelBox.getBoundingSphere(modelBoundingSphere);
    const modelCenterVector = modelBoundingSphere.center;
    const modelSize = modelBoundingSphere.radius;

    //camera.position.set(modelCenterVector.x, modelCenterVector.y, modelCenterVector.z + modelSize);
    camera.position.set(0, 0, 0.8 + modelSize);
    camera.lookAt(modelCenterVector);

    // Enable orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = false; // Disable auto-rotation
    controls.minDistance = 1.5; // Adjust this value as needed
    controls.maxDistance = 2; // Adjust this value as needed
    controls.update();

    document.addEventListener("click", (e) => {
      console.log(e)
      if (e.target.classList.contains("cgkit-swatch")) {
        let label =
          e.target.parentElement.parentElement.parentElement.parentNode
            .previousElementSibling.textContent;
        label = label.split(":")[0].trim();
        const value = e.target.getAttribute("data-attribute-value");
        switch (label) {
          case "Glove Logo":
            update("9p_logo_main", colors[value]);
            break;
          case "Glove Logo Outline":
            update("9p_logo_outline", colors[value]);
            break;
        //   case "Wrist Color":
        //     updateColor("wrist", colors[value]);
        //     break;
          case "Palm Color":
            updateColor("palm", colors[value]);
            updateColor("body_palm", colors[value]);
            break;
          case "Web Color":
            updateColor("web", colors[value]);
            break;        
          case "Lining Color":
            updateColor("lining", colors[value]);
            break;
          case "Binding Color":
            updateColor("binding", colors[value]);
            break;
          case "Lace Color":
            updateColor("laces", colors[value]);            
            break;
          case "Stitching Color":            
            ['stitches', 'palm_stitches'].forEach( (s) => updateColor(s, colors[value]));
            if( materialIsVisible("finger_pad") ){ updateColor('finger_pad_stitches', colors[value]); }            
            break;
          case "Embroidery Color":
            updateColor("9p_rise", colors[value]);
            break;
          case "Finger Protector Color":
            updateColor("finger_pad", colors[value]);
            break;
        case "Finger Protector":
            if(value === 'finger_pad'){
            if( !materialIsVisible("finger_pad") ) ? child.visible = true : null;
            updateColor("finger_pad", colors[value]);
            } else if (value === 'none'){
            child.visible = false;
            } else {
            updateColor("finger_pad", colors[value]);
            }
            break;
          default:
            break;
        }
      }
    });
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  }
);

// Animation
const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener("resize", () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

// Handle model scaling
function updateScale() {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}
