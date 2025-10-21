document.addEventListener('DOMContentLoaded', () => {
  // --- Find the canvas ---
  const canvas = document.querySelector('#hero-animation');
  if (!canvas) return;
  const container = document.querySelector('.avatar-container');
  if (!container) return;

  // --- 1. Scene and Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, // Wider Field of View
    1, // Aspect Ratio (1:1)
    0.1,
    1000
  );
  camera.position.z = 4; // Position camera

  // --- 2. Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientWidth);

  // --- 3. The Object (Icosahedron) ---
  const geometry = new THREE.IcosahedronGeometry(1.5, 0); // Radius 1.5, subdivision 0

  // The cool rainbow material
  const material = new THREE.MeshNormalMaterial({
    flatShading: true, // Gives it a faceted, low-poly look
  });

  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  // --- 4. Lighting (Simpler) ---
  // MeshNormalMaterial doesn't really need complex lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  // --- 5. Mouse Interaction ---
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0, mouseY = 0;

  const onMouseMove = (event) => {
    // Normalize mouse position (-1 to +1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  document.addEventListener('mousemove', onMouseMove);

  // --- 6. Animation Loop ---
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Slow auto-rotation
    icosahedron.rotation.y = 0.2 * elapsedTime;
    icosahedron.rotation.x = 0.1 * elapsedTime;

    // Mouse follow effect (subtle)
    targetRotationY = mouseX * 0.5;
    targetRotationX = mouseY * 0.5;

    // Apply mouse rotation smoothly
    icosahedron.rotation.y += (targetRotationY - icosahedron.rotation.y) * 0.05;
    icosahedron.rotation.x += (targetRotationX - icosahedron.rotation.x) * 0.05;

    // Render the scene
    renderer.render(scene, camera);
  };

  animate(); // Start the animation

  // --- 7. Handle Resize ---
  const onWindowResize = () => {
    const size = container.clientWidth;
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setSize(size, size);
  };
  window.addEventListener('resize', onWindowResize);
});