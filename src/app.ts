import * as THREE from 'three';
import './styles/styles.sass';
import orangeTexture from './assets/orangeTexture.png';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export class App {
   private camera: THREE.PerspectiveCamera;
   private renderer: THREE.WebGLRenderer;
   private scene: THREE.Scene;
   private plane: THREE.Mesh;
   private box: THREE.Mesh;

   constructor() {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.z = 5;

      const texture = new THREE.TextureLoader().load(orangeTexture);
      const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
      this.box = new THREE.Mesh(boxGeometry, boxMaterial);
      this.scene.add(this.box);

      const planeMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader });
      const planeGeometry = new THREE.PlaneGeometry(32, 18, 1, 1);
      this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
      this.plane.position.z = -5;

      this.scene.add(this.plane);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.renderer.domElement);
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
      this.render();
   }

   private onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   private render() {
      requestAnimationFrame(this.render.bind(this));
      this.box.rotation.x += 0.001;
      this.box.rotation.y -= 0.005;
      this.renderer.render(this.scene, this.camera);
   }
}

new App();
