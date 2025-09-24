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

// 创建一个平面
const textureLoader = new threeJs.TextureLoader(); // 创建纹理加载器
// 加载纹理
const doorColorTexture = textureLoader.load('texture/watercover/CityNewYork002_COL_VAR2_1K.png');
doorColorTexture.colorSpace = threeJs.SRGBColorSpace; // 设置颜色空间
// doorColorTexture.colorSpace = threeJs.LinearSRGBColorSpace; // 设置颜色空间
// doorColorTexture.colorSpace = threeJs.NoColorSpace; // 设置颜色空间



// 加载ao贴图 环境遮挡贴图
const doorAoTexture = textureLoader.load('texture/watercover/CityNewYork002_AO_1K.jpg');
// 加载透明度贴图
const doorAlphaTexture = textureLoader.load('texture/door/height.jpg');
// 加载光照贴图
const doorLightTexture = textureLoader.load('texture/colors.png');
// 加载高光贴图
const doorMetalnessTexture = textureLoader.load('texture/watercover/CityNewYork002_GLOSS_1K.jpg');
// 加载全景贴图
const rgbeLoader = new RGBELoader();
rgbeLoader.load("texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (enMap) => {
  enMap.mapping = threeJs.EquirectangularReflectionMapping;
  scene.background = enMap;
  scene.environment = enMap; // 设置场景的环境贴图
  // 设置plane材质的envMap属性
  planeMaterial.envMap = enMap;
})
// const doorPanoramaTexture = textureLoader.load('texture/sky/px.jpg');
// 创建平面
const planeGeometry = new threeJs.PlaneGeometry(1, 1);
const planeMaterial = new threeJs.MeshBasicMaterial({
  color: 0xffffff,
  map: doorColorTexture,
  // 允许透明
  transparent: true,
  // 设置ao贴图
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  // 透明度贴图
  // alphaMap: doorAlphaTexture,
  // 光照贴图
  // lightMap: doorLightTexture,
  // 高光贴图
  specularMap: doorMetalnessTexture,
  // 反射强度
  reflectivity: 0.5,

});
const plane = new threeJs.Mesh(planeGeometry, planeMaterial);
scene.add(plane); // 网格模型添加到场景中







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

gui.add(planeMaterial, 'aoMapIntensity').min(0).max(10).step(0.1).name('环境遮挡贴图强度')
gui.add(doorColorTexture, "colorSpace", {
  sRGB: threeJs.SRGBColorSpace,
  Linear: threeJs.LinearSRGBColorSpace,
  No: threeJs.NoColorSpace
}).onChange(() => {
  doorColorTexture.needsUpdate = true; // 更新贴图
})
