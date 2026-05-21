import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EvilEye from './EvilEye';

const PRESETS = [
  {
    name: 'Classic Amulet',
    eyeColor: '#1E40AF',
    intensity: 1.5,
    pupilSize: 0.6,
    irisWidth: 0.25,
    glowIntensity: 0.35,
    scale: 0.8,
    noiseScale: 1.0,
    pupilFollow: 1.0,
    flameSpeed: 1.0,
    backgroundColor: '#020617',
  },
  {
    name: 'Mystic Emerald',
    eyeColor: '#10B981',
    intensity: 1.8,
    pupilSize: 0.5,
    irisWidth: 0.3,
    glowIntensity: 0.5,
    scale: 0.8,
    noiseScale: 1.2,
    pupilFollow: 1.0,
    flameSpeed: 1.3,
    backgroundColor: '#022c22',
  },
  {
    name: 'Volcanic Flare',
    eyeColor: '#FF6F37',
    intensity: 2.0,
    pupilSize: 0.7,
    irisWidth: 0.2,
    glowIntensity: 0.6,
    scale: 0.9,
    noiseScale: 1.5,
    pupilFollow: 1.0,
    flameSpeed: 1.8,
    backgroundColor: '#1c0f0f',
  },
  {
    name: 'Cosmic Gold',
    eyeColor: '#F59E0B',
    intensity: 1.6,
    pupilSize: 0.55,
    irisWidth: 0.22,
    glowIntensity: 0.4,
    scale: 0.85,
    noiseScale: 0.8,
    pupilFollow: 1.0,
    flameSpeed: 0.7,
    backgroundColor: '#181206',
  }
];

const TABS = ['controls', 'info'];

function App() {
  const [params, setParams] = useState(PRESETS[0]);
  const [activeTab, setActiveTab] = useState('controls');

  // Refs for sliding indicators
  const presetBtnRefs = useRef([]);
  const [presetIndicatorStyle, setPresetIndicatorStyle] = useState({});
  const tabBtnRefs = useRef([]);
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({});

  const updateParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPreset = (preset) => {
    setParams(preset);
  };

  const resetCurrentPreset = () => {
    const original = PRESETS.find(p => p.name === params.name) || PRESETS[0];
    setParams(original);
  };

  // Preset selector sliding indicator position update
  useEffect(() => {
    const idx = PRESETS.findIndex(p => p.name === params.name);
    if (idx !== -1) {
      const el = presetBtnRefs.current[idx];
      if (el) {
        const parent = el.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          setPresetIndicatorStyle({
            top: elRect.top - parentRect.top,
            left: elRect.left - parentRect.left,
            width: elRect.width,
            height: elRect.height,
          });
        }
      }
    }
  }, [params.name]);

  // Tab selector sliding indicator position update
  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    if (idx !== -1) {
      const el = tabBtnRefs.current[idx];
      if (el) {
        const parent = el.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          setTabIndicatorStyle({
            top: elRect.top - parentRect.top,
            left: elRect.left - parentRect.left,
            width: elRect.width,
            height: elRect.height,
          });
        }
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen w-full bg-black text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 select-none">
      
      {/* Main Grid Wrapper */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] min-h-screen">
        
        {/* Left - Interactive Canvas Play Area */}
        <div className="flex flex-col relative h-[60vh] lg:h-screen min-w-0">
          
          <div className="relative flex-grow w-full bg-zinc-950/80 border border-zinc-900/40 overflow-hidden cursor-crosshair group flex items-center justify-center">
            
            {/* Custom Overlay with Active Preset & Reset Option */}
            <div className="absolute top-0 left-0 right-0 z-[20] flex items-center justify-between px-4 py-4 bg-gradient-to-b from-zinc-950/80 to-transparent text-xs text-gray-400 pointer-events-none">
              <div className="flex items-center gap-3 pointer-events-auto">
                <span className="text-[10px] tracking-wider font-mono uppercase bg-black/80 border border-zinc-800/80 px-3 py-1.5 rounded-full text-zinc-400 backdrop-blur-md">
                  GL Canvas Live Preview
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px]">Preset: {params.name}</span>
              </div>
              <button 
                onClick={resetCurrentPreset}
                className="hover:text-white/80 text-[10px] font-medium transition-colors cursor-pointer px-2.5 py-1 rounded bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/30 backdrop-blur-md pointer-events-auto"
              >
                Reset Preset
              </button>
            </div>

            {/* WebGL Canvas */}
            <div className="w-full h-full absolute inset-0 flex items-center justify-center">
              <EvilEye
                eyeColor={params.eyeColor}
                intensity={params.intensity}
                pupilSize={params.pupilSize}
                irisWidth={params.irisWidth}
                glowIntensity={params.glowIntensity}
                scale={params.scale}
                noiseScale={params.noiseScale}
                pupilFollow={params.pupilFollow}
                flameSpeed={params.flameSpeed}
                backgroundColor={params.backgroundColor}
              />
            </div>

            {/* Grid Effect Background Overlay */}
            <div className="absolute inset-0 border border-cyan-500/5 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Neon Border Highlights */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

        </div>

        {/* Right - Premium Glassmorphic Sidebar */}
        <div className="h-full flex flex-col gap-6 bg-zinc-900/60 backdrop-blur-xl border-l border-zinc-800/60 p-6 overflow-y-auto">
          
          {/* Section: Presets (Sliding Selector) */}
          <div>
            <h2 className="text-xs font-light text-white/70 mb-4 tracking-wider uppercase">Presets</h2>
            <div className="relative flex flex-col gap-1">
              <div
                className="absolute rounded-lg bg-white/10 transition-all duration-500 pointer-events-none"
                style={{ ...presetIndicatorStyle, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              {PRESETS.map((preset, i) => (
                <button
                  key={preset.name}
                  ref={el => presetBtnRefs.current[i] = el}
                  onClick={() => applyPreset(preset)}
                  className={`relative w-full text-left px-3 py-2 rounded-lg text-xs font-normal transition-colors duration-300 cursor-pointer ${
                    params.name === preset.name
                      ? 'text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{preset.name}</span>
                    <span className="text-[9px] font-mono text-white/80">
                      <span style={{ color: preset.eyeColor }}>●</span> {preset.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800/60" />

          {/* Section: Tab Switcher */}
          <div>
            <div className="relative grid grid-cols-2 gap-1 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800/50">
              <div
                className="absolute rounded-lg bg-white/10 transition-all duration-500 pointer-events-none"
                style={{ ...tabIndicatorStyle, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  ref={el => tabBtnRefs.current[i] = el}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-2 py-1.5 rounded-lg text-xs font-normal transition-colors duration-300 text-center cursor-pointer ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab === 'controls' ? 'Parameters' : 'Shader Info'}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Tab Content (Sliders or Info) */}
          <div className="flex-grow min-h-0 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'controls' ? (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 pr-1"
                >
                  {/* Colors Group */}
                  <div className="space-y-3 bg-zinc-950/30 p-3 rounded-xl border border-zinc-800/40">
                    
                    {/* Iris Color */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-medium text-zinc-400">Iris Color</label>
                        <span className="text-[9px] font-mono text-zinc-500">{params.eyeColor}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={params.eyeColor}
                          onChange={(e) => updateParam('eyeColor', e.target.value)}
                          className="w-7 h-7 rounded border border-zinc-800 bg-transparent cursor-pointer shrink-0"
                        />
                        <div className="flex gap-1 flex-wrap">
                          {['#FF6F37', '#1E40AF', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'].map((color) => (
                            <button
                              key={color}
                              onClick={() => updateParam('eyeColor', color)}
                              className="w-4 h-4 rounded-full border border-zinc-900 hover:scale-110 transition-transform cursor-pointer"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Canvas Inner BG */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-medium text-zinc-400">Canvas Inner BG</label>
                        <span className="text-[9px] font-mono text-zinc-500">{params.backgroundColor}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={params.backgroundColor}
                          onChange={(e) => updateParam('backgroundColor', e.target.value)}
                          className="w-7 h-7 rounded border border-zinc-800 bg-transparent cursor-pointer shrink-0"
                        />
                        <div className="flex gap-1 flex-wrap">
                          {['#000000', '#020617', '#090514', '#170f0f', '#022c22'].map((color) => (
                            <button
                              key={color}
                              onClick={() => updateParam('backgroundColor', color)}
                              className="w-4 h-4 rounded-full border border-zinc-900 hover:scale-110 transition-transform cursor-pointer"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Sliders Group */}
                  <div className="space-y-3.5">
                    
                    {/* Scale */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Talisman Scale</label>
                        <span className="text-[10px] font-mono text-white/80">{params.scale.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="1.5"
                        step="0.05"
                        value={params.scale}
                        onChange={(e) => updateParam('scale', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Intensity */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Light Intensity</label>
                        <span className="text-[10px] font-mono text-white/80">{params.intensity.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="3.0"
                        step="0.1"
                        value={params.intensity}
                        onChange={(e) => updateParam('intensity', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Pupil Size */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Pupil Size</label>
                        <span className="text-[10px] font-mono text-white/80">{params.pupilSize.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.2"
                        step="0.05"
                        value={params.pupilSize}
                        onChange={(e) => updateParam('pupilSize', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Iris Width */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Iris Width</label>
                        <span className="text-[10px] font-mono text-white/80">{params.irisWidth.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.8"
                        step="0.01"
                        value={params.irisWidth}
                        onChange={(e) => updateParam('irisWidth', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Glow Intensity */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Glow Intensity</label>
                        <span className="text-[10px] font-mono text-white/80">{params.glowIntensity.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="1.5"
                        step="0.05"
                        value={params.glowIntensity}
                        onChange={(e) => updateParam('glowIntensity', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Flame Speed */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Flame Speed</label>
                        <span className="text-[10px] font-mono text-white/80">{params.flameSpeed.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="3.0"
                        step="0.1"
                        value={params.flameSpeed}
                        onChange={(e) => updateParam('flameSpeed', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Noise Scale */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Noise Distortion</label>
                        <span className="text-[10px] font-mono text-white/80">{params.noiseScale.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={params.noiseScale}
                        onChange={(e) => updateParam('noiseScale', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                    {/* Pupil Follow */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="text-[11px] font-medium text-zinc-400">Cursor Pupil Follow</label>
                        <span className="text-[10px] font-mono text-white/80">{params.pupilFollow.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="2.0"
                        step="0.1"
                        value={params.pupilFollow}
                        onChange={(e) => updateParam('pupilFollow', Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white/80"
                      />
                    </div>

                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 text-xs text-slate-300 leading-relaxed pr-1"
                >
                  <div>
                    <h4 className="font-semibold text-slate-100 mb-1">How It Works</h4>
                    <p className="text-[11px] text-zinc-400">
                      This component renders a custom WebGL fragment shader on a single triangle covering the viewport. The math models a procedural eye with fractal brownian motion (FBM) noise.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border-l border-zinc-800 pl-2.5">
                      <h5 className="font-medium text-slate-200 mb-0.5 text-[11px]">Polar Mapping</h5>
                      <p className="text-[10px] text-zinc-500">Converts planar coordinates into polar coordinates to map the iris fibers radially.</p>
                    </div>
                    
                    <div className="border-l border-zinc-800 pl-2.5">
                      <h5 className="font-medium text-slate-200 mb-0.5 text-[11px]">Procedural Noise</h5>
                      <p className="text-[10px] text-zinc-500">A multi-octave Value Noise function running in pure GLSL generates the organic flame/fluid effect.</p>
                    </div>

                    <div className="border-l border-zinc-800 pl-2.5">
                      <h5 className="font-medium text-slate-200 mb-0.5 text-[11px]">Dynamic Uniforms</h5>
                      <p className="text-[10px] text-zinc-500">JavaScript feeds mouse coordinates, aspect ratios, and configuration values into the WebGL program in real time.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col gap-0.5 text-left text-[10px] text-zinc-500 shrink-0">
            <p>Move mouse over the canvas to interact with the pupil</p>
            <p className="font-mono">OGL WebGL Renderer</p>
          </div>

          <div className="h-px bg-zinc-800/60" />

          {/* Footer Copyright at Bottom */}
          <div className="text-center text-[10px] text-zinc-600 italic underline underline-offset-4 shrink-0">
            <a 
              href="https://sebas-dev.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-zinc-400 transition-colors cursor-pointer"
            >
              Creado por Sebastián Vásquez Echavarría
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
