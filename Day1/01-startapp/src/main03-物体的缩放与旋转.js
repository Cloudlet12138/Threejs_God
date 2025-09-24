import * as threeJs from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1、创建场景
const scene = new threeJs.Scene();

// 2、创建相机
const camera = new threeJs.PerspectiveCamera(
  45, // 视角越大，看到的东西越多
  window.innerWidth / window.innerHeight,  // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);

// 5、设置相机位置
camera.position.set(2, 2, 5); // 设置相机位置

// 3、 创建渲染器 画布
const renderer = new threeJs.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象


// 4、创建几何体
const geometry = new threeJs.BoxGeometry(1, 1, 1); // 创建立方体
const material = new threeJs.MeshBasicMaterial({ color: 0x00ff00 }); // 创建材质
const parentCubeMaterial = new threeJs.MeshBasicMaterial({ color: 0xff0000 }); 
let parentCube = new threeJs.Mesh(geometry, parentCubeMaterial); // 创建父物体
const cube = new threeJs.Mesh(geometry, material); // 创建物体
parentCube.add(cube); // 将物体添加到父物体中
parentCube.position.set(-3, 0, 0); // 设置父物体位置
// parentCube.scale.set(2, 2, 2); // 设置物体缩放 父元素缩放子元素会跟着缩放
parentCube.rotation.x = Math.PI / 4; // 设置物体旋转 物体绕自身轴心旋转 父元素旋转子元素也会叠加父元素的旋转角度


cube.position.set(3, 0, 0); // 设置物体位置


scene.add(parentCube); // 将物体添加到场景中



// 6、添加世界坐标系
const axesHelper = new threeJs.AxesHelper(5);
scene.add(axesHelper);

// 7、创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼（惯性）
// controls.autoRotate = true; // 启用自动旋转
// controls.autoRotateSpeed = 2.0; // 设置自动旋转速度

// 渲染函数
function animate() {
  controls.update(); // 更新阻尼（惯性）
  requestAnimationFrame(animate)
  // cube.rotation.x += 0.01; // 让立方体绕x轴旋转
  // cube.rotation.y += 0.01; // 让立方体绕y轴旋转
  renderer.render(scene, camera); // 渲染场景
}

animate();

// 6、渲染场景
// renderer.render(scene, camera);