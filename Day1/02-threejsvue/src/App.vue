<template>

</template>

<script setup>

import * as threeJs from 'three';

// 1、创建场景
const scene = new threeJs.Scene();

// 2、创建相机
const camera = new threeJs.PerspectiveCamera(
  45, // 视角越大，看到的东西越多
  window.innerWidth / window.innerHeight,  // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);


// 3、 创建渲染器 画布
const renderer = new threeJs.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
document.body.appendChild(renderer.domElement); // body元素中插入canvas对象

// 4、创建几何体
const geometry = new threeJs.BoxGeometry(1, 1, 1); // 创建立方体
const material = new threeJs.MeshBasicMaterial({ color: 0x00ff00 }); // 创建材质
const cube = new threeJs.Mesh(geometry, material); // 创建物体
scene.add(cube); // 将物体添加到场景中

// 5、设置相机位置
camera.position.set(0, 0, 5); // 设置相机位置
camera.lookAt(cube.position); // 设置相机方向(指向物体)

// 渲染函数
function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01; // 让立方体绕x轴旋转
  cube.rotation.y += 0.01; // 让立方体绕y轴旋转
  renderer.render(scene, camera); // 渲染场景
}

animate();

// 6、渲染场景
// renderer.render(scene, camera);

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

canvas {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
