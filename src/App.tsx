import { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { 
  Menu,
  X
} from 'lucide-react';
import Experience from './components/Experience';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [boost, setBoost] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [carColor, setCarColor] = useState("#0a0a0a");

  const colors = [
    { name: 'Carbon Black', value: '#0a0a0a' },
    { name: 'Arctic White', value: '#ffffff' },
    { name: 'Torch Red', value: '#ff0000' },
    { name: 'Rapid Blue', value: '#0066ff' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050505] font-sans text-white overflow-y-auto scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/40 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-red-600 rounded-sm rotate-45 flex items-center justify-center">
            <span className="text-white -rotate-45 text-xs font-black">Z1</span>
          </div>
          <span className="block">CHEVYZETTER <span className="text-red-600 ml-1">Z01</span></span>
        </motion.div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-[110]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden shrink-0">
        {/* 3D Scene Container */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="h-full w-full flex items-center justify-center bg-[#050505]">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
              />
            </div>
          }>
            <Experience carColor={carColor} autoRotate={autoRotate} boost={boost} />
          </Suspense>
        </div>

        {/* Hero Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-16 z-20">
          <div className="mt-32 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-red-600 font-display font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
                The Masterpiece
              </span>
              <h1 className="text-7xl md:text-[120px] font-display font-black tracking-tighter leading-[0.85] mb-8 uppercase">
                Z01<br />
                <span className="text-red-600">EDITION</span>
              </h1>
              <p className="text-white/60 text-xl max-w-xl leading-relaxed font-light pointer-events-auto">
                A singular vision of performance and luxury. Crafted for the elite.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-16"
            >
              <div className="flex flex-col">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Power</span>
                <span className="text-5xl font-display font-black">1200<span className="text-red-600 text-lg ml-1">HP</span></span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Top Speed</span>
                <span className="text-5xl font-display font-black">280<span className="text-red-600 text-lg ml-1">MPH</span></span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-right"
            >
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-2">Designed by</span>
              <span className="text-5xl font-display font-black tracking-tighter">ALTON WILLIAM</span>
            </motion.div>
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 pointer-events-auto">
          <div className="flex flex-col gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Configuration</span>
            
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest text-white/60">Exterior Color</span>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCarColor(c.value)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${carColor === c.value ? 'border-red-600 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-white/10 my-2" />

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setBoost(!boost)}
                className={`flex items-center justify-between gap-4 px-4 py-2 rounded-lg transition-all ${boost ? 'bg-red-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Boost Mode</span>
                <div className={`w-2 h-2 rounded-full ${boost ? 'bg-white animate-pulse' : 'bg-white/20'}`} />
              </button>

              <button 
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center justify-between gap-4 px-4 py-2 rounded-lg transition-all ${autoRotate ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60'}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Auto Rotate</span>
                <div className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-red-600' : 'bg-white/20'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="relative py-32 px-8 md:px-16 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 font-display font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
                Exclusive Signature
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none mb-8 uppercase">
                THE <span className="text-red-600">Z01</span><br />COLLECTOR'S MODEL
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-10">
                A precision-engineered masterpiece that captures every aggressive line of the Z01. Featuring the signature black body and red performance interior, this model stands as a testament to Alton William's design philosophy.
              </p>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-red-600 text-2xl font-display font-bold">01</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Limited Series</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-red-600 text-2xl font-display font-bold">RED</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Interior Trim</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-[#111]"
            >
              <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200" 
                alt="Z01 Signature Model" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-600">Signature Edition</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <span>© 2026 Z01 Automotive</span>
          <span>Alton William Signature Series</span>
        </div>
      </footer>
    </div>
  );
}
