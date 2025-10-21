document.addEventListener('DOMContentLoaded', () => {
  // --- Find the canvas ---
  const canvas = document.querySelector('#bg-animation');
  if (!canvas) return;

  // --- 1. Scene and Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5; // Start camera further back

  // --- 2. Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background for canvas itself
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // --- 3. Particles ---
  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3); // x, y, z for each particle
  const colors = new Float32Array(particleCount * 3); // r, g, b for each particle

  const colorInside = new THREE.Color(0xff8c00); // Your orange
  const colorOutside = new THREE.Color(0x553300); // Darker orange/brown
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Position particles randomly in a sphere shape
    const radius = Math.random() * 10; // Adjust spread
    const phi = Math.acos(-1 + (2 * Math.random()));
    const theta = Math.sqrt(particleCount * Math.PI) * phi;

    positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Color particles based on distance from center (orange near center, darker further out)
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / 10); // Lerp towards outside color

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.07,
    sizeAttenuation: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true, // Make sure this is true
    opacity: 0.2,      // ADD THIS LINE (Lower value = more transparent. Try 0.3 to 0.7)
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleSystem);

  // --- 4. Mouse Interaction ---
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // --- 5. Animation Loop ---
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate the whole particle system slowly
    particleSystem.rotation.y = elapsedTime * 0.1;
    particleSystem.rotation.x = elapsedTime * 0.05;

    // Make the camera subtly react to mouse movement
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position); // Ensure camera always looks at the center

    renderer.render(scene, camera);
  };

  animate();

  // --- 6. Handle Resize ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
});