import * as threeJs from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as Tween from 'three/examples/jsm/libs/tween.module.js';

// 1、创建场景
const scene = new threeJs.Scene();

// 2、创建相机
const camera = new threeJs.PerspectiveCamera(
  70, // 视角越大，看到的东西越多
  window.innerWidth / window.innerHeight,  // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);
camera.position.set(2, 2, 5); // 设置相机位置

// 3、 创建渲染器画布
const renderer = new threeJs.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象

// 添加坐标轴辅助器
const axesHelper = new threeJs.AxesHelper(5);
scene.add(axesHelper);

// scene.background = new threeJs.Color(0x999999) // 设置场景背景色

// 创建球体
const spmesh = new threeJs.Mesh(
  new threeJs.SphereGeometry(0.5, 20, 20),
  new threeJs.MeshBasicMaterial({ color: 0xff00ff }) // 黄色球体
)
spmesh.position.set(-2, 0, 0)
scene.add(spmesh)

// 使用tween.js实现动画
let target = { x: 2, y: 0, z: 0 }
let tween = new Tween.Tween(spmesh.position) // 创建一个新的tween，修改的是球体的位置属性
tween.to(target, 1000).onUpdate(() => {
    // console.log(spmesh.position) 
}) // 目标位置，动画持续时间1秒
// tween.repeat(Infinity) // 重复
// tween.yoyo(true) // 往返运动
// tween.delay(3000) // 延迟3秒开始
tween.easing(Tween.Easing.Quadratic.Out) // 设置缓动类型

// 第二个补间动画
let target2 = { x: 2, y: 2, z: 0 }
let tween2 = new Tween.Tween(spmesh.position) // 创建一个新的tween，修改的是球体的位置属性
tween2.to(target2, 1000)

tween.chain(tween2)
// tween2.chain(tween)
tween.start() // 开始动画
tween.onStart(() => {
  console.log('开始')
})

tween.onComplete(() => {
  console.log('结束')
})

tween.onStop(() => {
  console.log('停止')
})
tween2.onUpdate(() => {
  console.log('更新')
})



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 设置阻尼，让控制更有真实效果，必须在动画循环里调用update()
function animation() {
  controls.update();
  requestAnimationFrame(animation)
  renderer.render(scene, camera);
  Tween.update() // 更新tween
} 

animation()


// 监听窗口变化
window.addEventListener('resize', () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();

})



let gui = new GUI()
let params = {

    stop: () => {
        tween.stop()
    }
}

gui.add(params, 'stop').name('停止动画')
