import * as THREE from 'three';
import './styles/styles.sass';
import orangeTexture from './assets/orangeTexture.png';

export class App {
   private camera: THREE.PerspectiveCamera;
   private renderer: THREE.WebGLRenderer;
   private scene: THREE.Scene;
   private mesh: THREE.Mesh;

   constructor() {
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.z = 400;
      this.scene = new THREE.Scene();
      const texture = new THREE.TextureLoader().load(orangeTexture);
      const geometry = new THREE.BoxGeometry(200, 200, 200);

      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
      this.animate();
   }

   private onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   private animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.mesh.rotation.x += 0.0008;
      this.mesh.rotation.y -= 0.005;
      this.renderer.render(this.scene, this.camera);
   }
}

new App();
