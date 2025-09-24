import * as threeJs from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';


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


const uvTexture = new threeJs.TextureLoader().load(
  'texture/uv_grid_opengl.jpg'
);
console.log(uvTexture)


// 创建一个平面
const planeGeometry = new threeJs.PlaneGeometry(2, 2);
console.log(planeGeometry) // 查看顶点数据
const planeMaterial = new threeJs.MeshBasicMaterial({
    // color: 0xffff00,
    // side: threeJs.DoubleSide
  map: uvTexture,

});
const plane = new threeJs.Mesh(planeGeometry, planeMaterial);
plane.position.set(2, 0, 0);
scene.add(plane);




const geometry = new threeJs.BufferGeometry(); // 创建一个Buffer类型的几何体

// 创建顶点数据 Float32Array类型
// const vertices = new Float32Array([
//     -1.0, -1.0, 0.0,
//     1.0, -1.0, 0.0,
//     1.0, 1.0, 0.0,
//     1.0, 1.0, 0.0,
//     -1.0, 1.0, 0.0,
//     -1.0, -1.0, 0.0
// ])
// // 创建属性缓冲区对象
// geometry.setAttribute('position', new threeJs.BufferAttribute(vertices, 3)) // 3个一组表示一个顶点坐标

// 使用索引方式绘制正方形
const vertices = new Float32Array([
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0
])
const indices = new Uint16Array([
    0, 1, 2,
    2, 3, 0
])
geometry.setAttribute('position', new threeJs.BufferAttribute(vertices, 3)) // 3个一组表示一个顶点坐标

geometry.setIndex(new threeJs.BufferAttribute(indices, 1)); // 设置几何体索引

// 设置uv属性坐标
const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
])
geometry.setAttribute('uv', new threeJs.BufferAttribute(uvs, 2)) // 2个一组表示一个uv坐标
// 计算顶点法向量
geometry.computeVertexNormals();

// geometry.addGroup(0, 3, 0); // 添加组 第一组从第0个索引开始，3个索引，使用材质数组的第0个材质
// geometry.addGroup(3, 3, 1); // 添加组 第一组从第3个索引开始，3个索引，使用材质数组的第1个材质


const material = new threeJs.MeshBasicMaterial({ 
  map: uvTexture,
}); // 创建材质
const material2 = new threeJs.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // 创建材质
const cube = new threeJs.Mesh(geometry, material); // 创建物体
cube.position.set(-2, 0, 0);
scene.add(cube); // 将物体添加到场景中

// 创建法向量辅助线
const normalHelper = new VertexNormalsHelper(cube, 0.2, 0x00ff00);
scene.add(normalHelper);


// 6、添加世界坐标系
const axesHelper = new threeJs.AxesHelper(5);
scene.add(axesHelper);

const rgbeLoader = new RGBELoader();
rgbeLoader.load("texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (enMap) => {
  enMap.mapping = threeJs.EquirectangularReflectionMapping;
  scene.background = enMap;
  scene.environment = enMap; // 设置场景的环境贴图
  // 设置plane材质的envMap属性
  planeMaterial.envMap = enMap;
  material.envMap = enMap;
})

// 7、创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼（惯性）

// 渲染函数
function animate() {
  controls.update(); // 更新阻尼（惯性）
  requestAnimationFrame(animate)
  renderer.render(scene, camera); // 渲染场景
}

animate();

// 监听窗口变化
window.addEventListener('resize', () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();

})


let eventObj = {
    fullScreen: () => {
        document.body.requestFullscreen();
    },
    exitFullScreen: () => {
        document.exitFullscreen();
    }
}
let gui = new GUI()

