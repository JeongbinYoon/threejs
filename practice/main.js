import * as THREE from "../build/three.module.js";

main();
function main() {
	// 콘텍스트 생성
	// WebGLRendering 콘텍스트를 HTML 문서의 캔버스에 연결
	const canvas = document.querySelector("#canvas");
	const gl = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
	});

	// 카메라 생성
	const camera = new THREE.PerspectiveCamera(
		55, // 가시범위 각도
		canvas.clientWidth / canvas.clientHeight, // 가로 세로 비율
		0.1, // 화면 렌더링에 포함시키는 카메라의 최소 거리
		100 // 화면 렌더링에 포함시키는 카메라의 최대 거리
	);
	camera.position.set(6, 6, 30);

	// 장면 생성
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x0ff9fb); // 장면 배경색

	// 상자 지오메트리 생성
	const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);

	// 재질 생성
	const cubeMaterial = new THREE.MeshPhongMaterial({
		color: "tomato",
	});

	// 메시
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.set(6, 6, 0);
	scene.add(cube);

	// 애니메이션 그리기
	function drawAni() {
		if (resizeGLToDisplaySize(gl)) {
			const canvas = gl.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;

		gl.render(scene, camera);
		requestAnimationFrame(drawAni);
	}
	requestAnimationFrame(drawAni);

	// 조명
	const color = 0xffffff;
	const intensity = 1; // 강도 1

	const light = new THREE.DirectionalLight(color, intensity);
	scene.add(light);

	function resizeGLToDisplaySize(gl) {
		const canvas = gl.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width != width || canvas.height != height;
		if (needResize) {
			gl.setSize(width, height, false);
		}
		return needResize;
	}
}
