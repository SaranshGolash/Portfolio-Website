document.addEventListener('DOMContentLoaded', () => {
  // --- Find the canvas ---
  const canvas = document.querySelector('#hero-animation');
  if (!canvas) {
    console.error('Canvas element #hero-animation not found!');
    return;
  }
  const container = document.querySelector('.avatar-container');
  if (!container) {
    console.error('Container element .avatar-container not found!');
    return;
  }

  // --- 1. Scene and Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50, // Reduced Field of View to zoom in slightly
    1, // Aspect Ratio (1:1 for the circle)
    0.1,
    1000
  );
  camera.position.z = 3; // Move camera back slightly

  // --- 2. Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Transparent background
    antialias: true, // Smoother edges
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientWidth);

  // --- 3. Texture Loader ---
  const textureLoader = new THREE.TextureLoader();
  const avatarTexture = textureLoader.load(
    '/images/kurta-mine.jpg', // <-- YOUR IMAGE PATH
    () => {
      // Optional: Log when texture loads
      console.log('Avatar texture loaded successfully');
      animate(); // Start animation only after texture loads
    },
    undefined, // onProgress callback (not needed)
    (error) => {
      // Optional: Log if texture fails to load
      console.error('Error loading avatar texture:', error);
    }
  );
  // Improve texture quality
  avatarTexture.minFilter = THREE.LinearFilter;
  avatarTexture.magFilter = THREE.LinearFilter;
  avatarTexture.colorSpace = THREE.SRGBColorSpace; // Correct color space for images

  // --- 4. The Object (Cylinder) ---
  const geometry = new THREE.CylinderGeometry(
    1, // Radius top
    1, // Radius bottom
    0.1, // Height (make it like a flat coin/disc)
    64 // Radial segments (smooth circle)
  );

  // Material using the loaded texture
  const material = new THREE.MeshStandardMaterial({
    map: avatarTexture, // Apply the image here
    side: THREE.DoubleSide, // Ensure texture shows if viewed from behind
  });

  const cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

  // --- 5. Lighting ---
  // Ambient light provides base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increase intensity
  scene.add(ambientLight);

  // Directional light adds highlights and shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 5); // Position light source
  scene.add(directionalLight);

  // --- 6. Mouse Interaction ---
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  const onMouseDown = (event) => {
    isDragging = true;
    canvas.style.cursor = 'grabbing';
  };

  const onMouseUp = () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  };

  const onMouseMove = (event) => {
    // Only rotate if dragging
    if (!isDragging) {
       // Slightly rotate based on general mouse position for a subtle effect
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * 0.1;
        targetRotationX = mouseY * 0.1;
       return;
    }

    // Calculate mouse movement since last frame
    const deltaMove = {
      x: event.offsetX - previousMousePosition.x,
      y: event.offsetY - previousMousePosition.y,
    };

    // Update target rotation based on drag delta
    targetRotationY += deltaMove.x * 0.01;
    targetRotationX += deltaMove.y * 0.01;

    // Store current position for next frame
    previousMousePosition = { x: event.offsetX, y: event.offsetY };
  };

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mousemove', onMouseMove);
  // Stop dragging if mouse leaves the canvas
  canvas.addEventListener('mouseleave', onMouseUp);

  // --- 7. Animation Loop ---
  const clock = new THREE.Clock();
  let animationStarted = false; // Flag to check if animation has started

  const animate = () => {
    if (!animationStarted) animationStarted = true; // Set flag on first run
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Slow auto-rotation
    cylinder.rotation.y = 0.1 * elapsedTime;

    // Apply mouse drag rotation (with smoothing)
    cylinder.rotation.x += (targetRotationX - cylinder.rotation.x) * 0.1;
    cylinder.rotation.y += (targetRotationY - cylinder.rotation.y) * 0.1;

    // Render the scene
    renderer.render(scene, camera);
  };

  // Do not call animate() here; it's called in the textureLoader callback

  // --- 8. Handle Resize ---
  const onWindowResize = () => {
    const size = container.clientWidth;
    camera.aspect = 1; // Keep aspect ratio 1:1
    camera.updateProjectionMatrix();
    renderer.setSize(size, size);
  };
  window.addEventListener('resize', onWindowResize);
});