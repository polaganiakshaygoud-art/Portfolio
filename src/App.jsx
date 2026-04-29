import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Code,
  User,
  Mail,
  ExternalLink,
  Briefcase,
  Cpu,
  Send,
  ChevronRight,
  Globe,
  Database,
  Terminal,
  Layers,
  ImagePlus,
  Camera
} from 'lucide-react';

import profileImg from './assets/profile.jpg';

// --- Full-Page Code Particles Background ---
const CODE_TOKENS = [
  'def', 'class', 'import', 'async', 'await', 'return', 'lambda',
  'const', 'let', 'useState', 'useEffect', 'fetch()', 'async/await',
  '{  }', '[  ]', '(  )', '&& ||', '...', '??', 'null',
  'npm', 'git', 'API', 'REST', 'JSON', 'SQL', 'try', 'catch',
  'python3', 'React', 'Node.js', 'Flask', '.map()', '.filter()',
  'print()', 'for i in', '__main__', 'requests', 'pandas',
  '200 OK', '404', 'render()', 'npm run dev', 'git commit',
  'push()', 'pull()', 'merge', 'branch', 'venv', 'pip install',
  'useState()', '.then()', 'useRef', 'props', 'export default',
];

const CodeParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // --- Neural network nodes ---
    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.35 + 0.08,
    }));

    const CONNECTION_DIST = 155;

    // --- Floating code tokens ---
    const tokenCount = 24;
    const tokens = Array.from({ length: tokenCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: Math.random() * 0.38 + 0.12,
      opacity: Math.random() * 0.11 + 0.03,
      size: Math.floor(Math.random() * 5) + 10,
      text: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
      drift: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '129,140,248' : '192,132,252',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(129,140,248,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${node.opacity})`;
        ctx.fill();
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > W) node.vx *= -1;
        if (node.y < 0 || node.y > H) node.vy *= -1;
      });

      // Draw floating code tokens
      tokens.forEach(tok => {
        ctx.save();
        ctx.font = `${tok.size}px 'JetBrains Mono', 'Fira Code', 'Courier New', monospace`;
        ctx.fillStyle = `rgba(${tok.hue},${tok.opacity})`;
        ctx.fillText(tok.text, tok.x, tok.y);
        ctx.restore();

        tok.y -= tok.speed;
        tok.x += tok.drift;

        if (tok.y < -30) {
          tok.y = H + 30;
          tok.x = Math.random() * W;
          tok.text = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
          tok.opacity = Math.random() * 0.11 + 0.03;
          tok.hue = Math.random() > 0.5 ? '129,140,248' : '192,132,252';
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

// --- Loading Screen Component ---
const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initializing Akshay's Experience...");

  const loadingMessages = [
    "Compiling Skills...",
    "Booting NASA API Trackers...",
    "Training Code Review Agent...",
    "Assembling 3D Portfolio...",
    "Almost ready, Akshay..."
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 500);
          return 100;
        }
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 200);

    let messageInterval = setInterval(() => {
      setText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/40 text-sm font-mono tracking-widest uppercase animate-pulse">
        {text}
      </p>
      <div className="mt-2 text-white font-bold font-mono">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

// --- Animated Scroll Reveal Component ---
const ScrollReveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- Three.js Background Component ---
const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      emissive: 0x4338ca,
      emissiveIntensity: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.003,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x818cf8, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Interactive rotation & scroll rotation
      mesh.rotation.y = time * 0.2 + targetX + scrollY * 0.001;
      mesh.rotation.x = time * 0.1 + targetY;

      // Adjust particle rotation based on mouse
      particlesMesh.rotation.y = -time * 0.05 + targetX * 0.5;
      particlesMesh.rotation.x = targetY * 0.5;

      // Camera parallax and scroll drop
      camera.position.x += (mouseX * 0.001 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.001 - camera.position.y - scrollY * 0.002) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

// --- Main App Component ---
export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onFinished={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* === Full-Page Animated Code Particles Background === */}
      <CodeParticlesBackground />

      {/* Background Gradients (on top of canvas, below content) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" style={{zIndex:1}} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-900/10 blur-[120px] pointer-events-none" style={{zIndex:1}} />

      {/* All page content sits above the canvas */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center glass border-b-0">
        <div className="text-2xl font-bold tracking-tighter text-gradient">PA.DEV</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70 uppercase tracking-widest">
          {['About', 'Projects', 'Gallery', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:polaganiakshaygoud@gmail.com"
          className="px-6 py-2 rounded-full glass border border-white/10 text-sm font-semibold hover:bg-white/5 transition-all"
        >
          Hire Me
        </a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <Hero3D />

        <ScrollReveal className="z-10 max-w-4xl">
          <p className="text-indigo-400 font-mono tracking-[0.3em] uppercase text-sm mb-6">
            Full Stack Web Developer | Python Programmer
          </p>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            POLAGANI <br />
            <span className="text-gradient">AKSHAY</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Second-year B.Tech student specializing in building high-performance web applications and AI-driven developer tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#projects" className="group px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              View My Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 glass border border-white/10 rounded-full font-bold transition-all hover:bg-white/5">
              Contact Me
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-indigo-500" />
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Coding with <br /> <span className="text-gradient">Precision</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            I'm an Information Technology student at Gurunanak Institution of Technical Campus. I have a genuine passion for building things on the web and writing clean, efficient code.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            I thrive in collaborative environments, having participated in multiple hackathons where I designed and shipped working prototypes under tight deadlines.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-2">2+</div>
              <div className="text-white/40 text-sm uppercase tracking-widest">Hackathons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Ongoing</div>
              <div className="text-white/40 text-sm uppercase tracking-widest">B.Tech IT</div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="relative aspect-square">
          <TiltCard className="w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl blur-3xl" />
            <div className="glass border border-white/10 w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden group">
              <img src={profileImg} alt="Polagani Akshay" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 grayscale-[20%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-80" />

              <div className="absolute top-10 right-10 w-20 h-20 glass rounded-full animate-float opacity-40 flex items-center justify-center">
                <Terminal className="w-8 h-8 text-blue-400" />
              </div>
              <div className="absolute bottom-20 left-10 w-16 h-16 glass rounded-full animate-float opacity-30 flex items-center justify-center" style={{ animationDelay: '1s' }}>
                <Layers className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="flex flex-col items-center text-center mb-20">
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-4">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold">Featured <span className="text-gradient">Projects</span></h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "NASA Space Data Tracker",
                desc: "A web application that pulls and displays live data from NASA's public APIs. Features an interactive interface to explore real-time space info.",
                tags: ["Python", "JavaScript", "REST APIs", "Vite"]
              },
              {
                title: "Code Review Agent",
                desc: "AI-powered developer tool that identifies inefficient code and suggests modern, best-practice alternatives with clear explanations.",
                tags: ["Python", "AI Integration", "NLP", "React"],
                link: "https://code-review-agent-v1.onrender.com"
              },
            ].map((proj, i) => (
              <ScrollReveal key={i} delay={i * 0.2} className="h-full">
                <TiltCard className="h-full group">
                  <div className="h-full glass border border-white/10 rounded-3xl p-10 overflow-hidden transition-colors duration-500 hover:bg-white/[0.05]">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mb-8">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{proj.title}</h3>
                    <p className="text-white/60 mb-8 leading-relaxed">{proj.desc}</p>
                    
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 text-sm font-bold group/link"
                      >
                        Live Demo <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {proj.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="flex flex-col items-center text-center mb-20">
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-4">Moments</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Gallery</span></h2>
            <p className="text-white/40 text-sm font-mono max-w-md">
              A collection of memories, hackathons, events &amp; achievements.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { label: 'Hackathon Moments', index: 0 },
              { label: 'Project Demos',     index: 1 },
              { label: 'Campus Life',       index: 2 },
              { label: 'Achievements',      index: 3 },
              { label: 'Team & Events',     index: 4 },
              { label: 'Behind the Code',   index: 5 },
            ].map(({ label, index }) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <TiltCard>
                  <div
                    className="group relative aspect-square rounded-2xl glass border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-3 cursor-pointer"
                    style={{ minHeight: '180px' }}
                  >
                    {/* Animated glow ring */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: 'inset 0 0 40px rgba(129,140,248,0.12)' }}
                    />
                    {/* Corner accent lines */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-indigo-500/40 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-indigo-500/40 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-indigo-500/40 rounded-br-lg" />

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-300">
                      <ImagePlus className="w-6 h-6 text-indigo-400/60 group-hover:text-indigo-400 transition-colors duration-300" />
                    </div>

                    {/* Label */}
                    <div className="text-center px-4">
                      <p className="text-white/30 text-xs font-mono uppercase tracking-widest group-hover:text-white/50 transition-colors duration-300">{label}</p>
                      <p className="text-white/15 text-[10px] mt-1 group-hover:text-white/25 transition-colors duration-300">Click to add photo</p>
                    </div>

                    {/* Subtle pulsing dot */}
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-pulse" />
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Add more photos CTA */}
          <ScrollReveal delay={0.3} className="mt-10 flex justify-center">
            <button className="group flex items-center gap-3 px-8 py-4 glass border border-dashed border-indigo-500/30 rounded-2xl text-white/40 text-sm font-mono uppercase tracking-widest hover:border-indigo-400/60 hover:text-white/60 transition-all duration-300">
              <Camera className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
              Add More Photos
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-4 inline-block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Technical <span className="text-gradient">Toolkit</span></h2>

            <div className="space-y-8">
              {[
                { name: "Python Programming", level: 90 },
                { name: "Full Stack Web (MERN/Vite)", level: 85 },
                { name: "REST API Integration", level: 88 },
                { name: "AI/LLM Integration", level: 75 }
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-white/80">{skill.name}</span>
                    <span className="font-mono text-indigo-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-1000 delay-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Python', icon: <Terminal className="w-5 h-5" /> },
              { name: 'JavaScript', icon: <Code className="w-5 h-5" /> },
              { name: 'Java', icon: <Database className="w-5 h-5" /> },
              { name: 'REST APIs', icon: <Globe className="w-5 h-5" /> },
              { name: 'React', icon: <Layers className="w-5 h-5" /> },
              { name: 'Git/GitHub', icon: <Briefcase className="w-5 h-5" /> },
              { name: 'Data Structures', icon: <Cpu className="w-5 h-5" /> },
              { name: 'OOP', icon: <Terminal className="w-5 h-5" /> }
            ].map((tech, index) => (
              <ScrollReveal key={tech.name} delay={index * 0.1}>
                <TiltCard>
                  <div className="glass border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-colors hover:border-indigo-500/50 cursor-default group">
                    <div className="text-indigo-400 group-hover:scale-110 transition-transform">{tech.icon}</div>
                    <span className="text-sm font-bold text-white/80">{tech.name}</span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8">
        <ScrollReveal className="max-w-4xl mx-auto glass border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

          <span className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-6 inline-block">Contact</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">Let's <span className="text-gradient">Connect</span></h2>

          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Currently seeking internship or entry-level opportunities in Hyderabad or remote.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            <a href="mailto:polaganiakshaygoud@gmail.com" className="px-8 py-4 glass border border-white/10 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
              <Mail className="w-5 h-5" /> polaganiakshaygoud@gmail.com
            </a>
            <a href="https://linkedin.com/in/akshay-polagani-27a03933a" target="_blank" className="px-8 py-4 glass border border-white/10 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
              <User className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://github.com/polaganiakshaygoud-art" target="_blank" className="px-8 py-4 glass border border-white/10 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
              <Code className="w-5 h-5" /> GitHub
            </a>
          </div>

          <form className="max-w-md mx-auto space-y-6">
            <input type="text" placeholder="Your Name" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20" />
            <textarea placeholder="Message" rows="4" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20 resize-none"></textarea>
            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] transition-all flex items-center justify-center gap-2 group">
              Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-white/30 text-sm tracking-widest font-mono">
        <p>© 2026 POLAGANI AKSHAY • HYDERABAD, INDIA</p>
      </footer>
      </div>{/* end content wrapper */}
    </div>
  );
}

