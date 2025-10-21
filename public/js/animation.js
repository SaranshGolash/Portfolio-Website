document.addEventListener('DOMContentLoaded', () => {
  // --- Find the canvas ---
  const canvas = document.querySelector('#hero-animation');
  if (!canvas) {
    return;
  }
  const container = document.querySelector('.avatar-container');

  // --- 1. Scene and Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, // Field of View
    container.clientWidth / container.clientWidth, // Aspect Ratio (1:1)
    0.1, // Near clip
    1000 // Far clip
  );
  camera.position.z = 5; // Move camera back

  // --- 2. Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientWidth);

  // --- 3. The Object ---
  // A "tech donut" shape
  const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
  // The "tech" look (wireframe) in your portfolio's orange
  const material = new THREE.MeshStandardMaterial({
    color: 0xff8c00, // Your orange
    wireframe: true,
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // --- 4. Lighting ---
  const pointLight = new THREE.PointLight(0xffffff, 500); // Bright white light
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft base light
  scene.add(ambientLight);

  // --- 5. Mouse Interaction ---
  let targetRotationX = 0;
  let targetRotationY = 0;
  const onMouseMove = (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    // Set rotation targets based on mouse position
    targetRotationY = mouseX * 0.5; // Rotate left/right
    targetRotationX = mouseY * 0.5; // Rotate up/down
  };
  document.addEventListener('mousemove', onMouseMove);

  // --- 6. Animation Loop ---
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Auto-rotation
    torusKnot.rotation.y = 0.3 * elapsedTime;

    // Mouse-based rotation (with smoothing)
    torusKnot.rotation.x +=
      (targetRotationX - torusKnot.rotation.x) * 0.05;
    torusKnot.rotation.y +=
      (targetRotationY - torusKnot.rotation.y) * 0.05;

    // Render the scene
    renderer.render(scene, camera);
  };

  animate();

  // --- 7. Handle Resize ---
  const onWindowResize = () => {
    const size = container.clientWidth;
    camera.aspect = 1; // Keep it 1:1
    camera.updateProjectionMatrix();
    renderer.setSize(size, size);
  };
  window.addEventListener('resize', onWindowResize);
});