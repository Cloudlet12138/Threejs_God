import * as threeJs from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// 1、创建场景
const scene = new threeJs.Scene();

// 2、创建相机
const camera = new threeJs.PerspectiveCamera(
  45, // 视角越大，看到的东西越多
  window.innerWidth / window.innerHeight,  // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);
camera.position.set(2, 2, 5); // 设置相机位置

// 3、 创建渲染器 画布
const renderer = new threeJs.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象

// 添加坐标轴辅助器
const axesHelper = new threeJs.AxesHelper(5);
scene.add(axesHelper);


// 创建一个立方体
const boxGeometry = new threeJs.BoxGeometry(1, 1, 100);
const boxMaterial = new threeJs.MeshBasicMaterial({ color: 0x00ff00 });
const box = new threeJs.Mesh(boxGeometry, boxMaterial);
scene.add(box)

// 创建场景fog
// scene.fog = new threeJs.Fog(0x999999, 0.1, 50); // 线性雾
// 创建场景指数雾
scene.fog = new threeJs.FogExp2(0x999999, 0.1); // 指数雾
scene.background = new threeJs.Color(0x999999) // 设置场景背景色


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 设置阻尼，让控制更有真实效果，必须在动画循环里调用update()
function animation() {
  controls.update();
  requestAnimationFrame(animation)
  renderer.render(scene, camera);
} 

animation()



let gui = new GUI()
let params = {}
