// Callwise Standard-Hintergrund: three.js Partikelwelle (fuer alle Posts einheitlich)
import * as THREE from 'three';
export function renderBg(canvas, {seed=0}={}){
  const r=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true});
  r.setPixelRatio(2); r.setSize(1080,1350,false); r.setClearColor(0xFAFAF7,0);
  const scene=new THREE.Scene(), cam=new THREE.PerspectiveCamera(38,1080/1350,0.1,200);
  const GRAY=new THREE.Color('#9a9aa8'),PINK=new THREE.Color('#D04894'),VIOL=new THREE.Color('#805AE2');
  const sm=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,
    vertexShader:`attribute float size;attribute vec3 color;attribute float alpha;varying vec3 vC;varying float vA;
      void main(){vC=color;vA=alpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(1150.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`varying vec3 vC;varying float vA;void main(){vec2 c=gl_PointCoord-0.5;float d=length(c);if(d>0.5)discard;gl_FragColor=vec4(vC,smoothstep(0.5,0.38,d)*vA);}`});
  const P=[],C=[],S=[],A=[], nx=170,nz=90, bx=6+seed*2, bz=-3;
  for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){
    const x=(i/(nx-1)-.5)*36, z=-(j/(nz-1))*28+4;
    const bump=Math.exp(-((x-bx)**2/12+(z-bz)**2/7))*2.2;
    const y=1.0*(0.55*Math.sin(x*.28+z*.18+seed)+0.35*Math.sin(x*.11-z*.32+1.2))+bump;
    P.push(x,y,z);
    const hi=Math.max(sm(0.35,1.1,y),bump*.6), c=GRAY.clone().lerp(PINK.clone().lerp(VIOL,sm(-10,10,x)),hi);
    C.push(c.r,c.g,c.b); S.push(0.055+0.08*hi); A.push((0.50+0.50*hi)*sm(-28,-4,z));
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));
  g.setAttribute('size',new THREE.Float32BufferAttribute(S,1));g.setAttribute('alpha',new THREE.Float32BufferAttribute(A,1));
  scene.add(new THREE.Points(g,mat));
  cam.position.set(0,6.4,12); cam.lookAt(0,-2.2,-6); cam.setViewOffset(1080,1350,0,-60,1080,1350);
  r.render(scene,cam);
}
