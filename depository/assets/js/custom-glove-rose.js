import*as e from"three";import{OrbitControls as o}from"three/addons/controls/OrbitControls.js";import{GLTFLoader as a}from"three/addons/loaders/GLTFLoader.js";import{DRACOLoader as t}from"three/addons/loaders/DRACOLoader.js";const r={"apple-green":9684002,beige:16771194,black:1579284," blue":29377,brown:6703142,coffee:8537857,"forest-green":3100976,green:3100976,grey:8026989,"lemon-yellow":15593299,"lt-blue":8900331,"lt-tea":10180651,"lt-grey":10594179,navy:1315958,"neon-yellow":15593299,orange:14909700,pink:16716947,purple:4929865,red:11870744,"royal-blue":530284,teal:32896,toffee:8801316,white:16711422,wine:7483191,yellow:13866246,"vegas-gold":12956504,"yellow-gold":16768768,silver:12632256,none:"none"},n=new e.Scene,i=new e.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),s=new e.WebGLRenderer({antialias:!0,alpha:!0});s.shadowMap.enabled=!0,s.shadowMap.type=e.PCFSoftShadowMap;const l=document.getElementById("myThreeJSScene");s.setSize(l.clientWidth,l.clientHeight),l.appendChild(s.domElement);const c=new e.PlaneGeometry(.5,.5),d=new e.MeshStandardMaterial({transparent:!0,opacity:.2,depthWrite:!1}),h=new e.Mesh(c,d);h.rotation.x=-Math.PI/2,h.position.y=-.25,h.receiveShadow=!0,n.add(h);const m=new e.HemisphereLight(16777215,16777215,2);m.color.setHSL(.6,1,.6),m.groundColor.setHSL(.095,1,.75),m.position.set(0,50,0),n.add(m);new e.HemisphereLightHelper(m,10);const g=new e.DirectionalLight(16777215,3);g.color.setHSL(.1,1,.95),g.position.set(1,1.75,-1),g.position.multiplyScalar(30),n.add(g),g.castShadow=!0,g.shadow.mapSize.width=2048,g.shadow.mapSize.height=2048;const w=50;g.shadow.camera.left=-w,g.shadow.camera.right=w,g.shadow.camera.top=w,g.shadow.camera.bottom=-w,g.shadow.camera.far=3500,g.shadow.bias=-1e-4;const b=new e.DirectionalLight(16777215,3);b.color.setHSL(.1,1,.95),b.position.set(-1,1.75,1),b.position.multiplyScalar(30),n.add(b),b.castShadow=!0,b.shadow.mapSize.width=2048,b.shadow.mapSize.height=2048;b.shadow.camera.left=-w,b.shadow.camera.right=w,b.shadow.camera.top=w,b.shadow.camera.bottom=-w,b.shadow.camera.far=3500,b.shadow.bias=-1e-4;const p=new e.DirectionalLight(16777215,1);p.color.setHSL(.1,1,.95),p.position.set(-1,-1.75,1),p.position.multiplyScalar(30),n.add(p),p.castShadow=!0,p.shadow.mapSize.width=2048,p.shadow.mapSize.height=2048;p.shadow.camera.left=-w,p.shadow.camera.right=w,p.shadow.camera.top=w,p.shadow.camera.bottom=-w,p.shadow.camera.far=3500,p.shadow.bias=-1e-4;const u=new e.LoadingManager;u.onStart=function(e,o,a){console.log("Started loading file: "+e+".\nLoaded "+o+" of "+a+" files.")},u.onLoad=function(){console.log("Loading complete!"),document.getElementById("Loader").style.display="none"},u.onProgress=function(e,o,a){console.log("Loading file: "+e+".\nLoaded "+o+" of "+a+" files.")},u.onError=function(e){console.log("There was an error loading "+e)};const f=new a(u),C=new t;let k;C.preload(),C.setDecoderPath("decoder/"),C.setDecoderConfig({type:"js"}),f.setDRACOLoader(C),f.load(customModel.file,(a=>{function t(e,o){n.traverse((a=>{a.isMesh&&a.material.name===e&&("9p_logo_outline"===a.material.name&&!1===a.visible&&("string"==typeof o&&"none"===o&&(a.visible=!1),a.visible=!0),a.material.color.set(Number(o.toString())),a.material.emissive.set(Number(o.toString())))}))}k=a.scene,k.scale.set(20,20,20),k.castShadow=!0,k.receiveShadow=!0;const c=(new e.Box3).setFromObject(k),d=c.getCenter(new e.Vector3);k.position.sub(d),k.traverse((e=>{if(e.isMesh)switch(e.material.name){case"n_logo_main":case"n_logo_outline":case"ny_logo_main":case"ny_logo_outline":case"9p_logo_outline":e.visible=!1;break;case"9p_logo_main":case"9p_rise":case"web_graphic":e.material.color.set(Number(13019181));break;default:e.material.color.set(Number(2105376))}})),n.add(k),function(){const e=l.clientWidth,o=l.clientHeight;i.aspect=e/o,i.updateProjectionMatrix(),s.setSize(e,o)}();const h=new e.Sphere;c.getBoundingSphere(h);const m=h.center,g=h.radius;i.position.set(0,0,.8+g),i.lookAt(m);const w=new o(i,s.domElement);w.enableZoom=!0,w.autoRotate=!1,w.minDistance=5,w.maxDistance=7,w.update(),document.addEventListener("click",(e=>{if(e.target.classList.contains("cgkit-swatch")){let o=e.target.parentElement.parentElement.parentElement.parentNode.previousElementSibling.textContent;o=o.split(":")[0].toLowerCase();const a=e.target.getAttribute("data-attribute-value");switch(o){case"Back Finger Color":t("back_finger",r[a]);break;case"Thumb Finger Color":t("thumb_finger",r[a]);break;case"Thumb Inner Color":t("thumb_inner",r[a]);break;case"Thumb Outer Color":case"Index Outer Color":t("index_outer",r[a]);break;case"Index Inner Color":case"Index Inner Color":t("index_inner",r[a]);break;case"Ring Inner Color":t("ring_inner",r[a]);break;case"Pinky Inner Color":t("pinky_inner",r[a]);break;case"Middle Inner Color":t("middle_inner",r[a]);break;case"Middle Outer Color":t("middle_outer",r[a]);break;case"Ring Outer Color":t("ring_outer",r[a]);break;case"Pinky Outer Color":t("pinky_outer",r[a]);break;case"Wrist Color":t("wrist",r[a]);break;case"Palm Color":t("palm",r[a]);break;case"Web Color":t("web",r[a]);break;case"Web Color":t("web_graphic",r[a]);break;case"Lining Color":case"Lining Color":t("lining",r[a]);break;case"Web Base Color":t("web_utoe",r[a]);break;case"Target Color":t("target",r[a]);break;case"Binding Color":["binding","binding2"].forEach((e=>{t(e,r[a])}));break;case"Welt Color":["welt","welt2"].forEach((e=>{t(e,r[a])}));break;case"Lace Color":["laces","web laces"].forEach((e=>{t(e,r[a])}));break;case"Stitching Color":["stitches","web_stitches"].forEach((e=>{t(e,r[a])}));break;case"Embroidery Color":t("embroidery",r[a]);break;case"Finger Protector Color":t("finger_protector",r[a]);break;case"Glove Logo Color":t("glove_logo",r[a])}}}))}),(e=>{console.log(e.loaded/e.total*100+"% loaded")}));const S=()=>{requestAnimationFrame(S),k&&(k.rotation.y+=.005),s.render(n,i)};S(),window.addEventListener("resize",(()=>{const e=l.clientWidth,o=l.clientHeight;i.aspect=e/o,i.updateProjectionMatrix(),s.setSize(e,o)}));