import * as threeJs from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

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

scene.background = new threeJs.Color(0x999999) // 设置场景背景色

// 创建三个球体
const mesh1 = new threeJs.Mesh(
  new threeJs.SphereGeometry(0.5, 20, 20),
  new threeJs.MeshBasicMaterial({ color: 0xff00ff }) // 黄色球体
)
mesh1.position.set(-2, 0, 0)
scene.add(mesh1)
const mesh2 = new threeJs.Mesh(
  new threeJs.SphereGeometry(0.5, 20, 20),
  new threeJs.MeshBasicMaterial({ color: 0x00ff00 })
)
scene.add(mesh2)
const mesh3 = new threeJs.Mesh(
  new threeJs.SphereGeometry(0.5, 20, 20),
  new threeJs.MeshBasicMaterial({ color: 0x0000ff })
)
mesh3.position.set(2, 0, 0)
scene.add(mesh3)


// 创建一个射线投射器
const raycaster = new threeJs.Raycaster();
// 创建一个向量2对象，鼠标位置归一化坐标
const mouse = new threeJs.Vector2();


window.addEventListener('click', (event) => {
     // 计算鼠标位置在归一化设备坐标中的位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // 通过鼠标位置和当前相机计算出射线
    raycaster.setFromCamera(mouse, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
    console.log(intersects);
    if (intersects.length > 0) {
        intersects[0].object.material.color.set(0xff0000)
    }
})

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
