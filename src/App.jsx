import { useState } from 'react';
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

function App() {
  const [params, setParams] = useState(PRESETS[0]);
  const [activeTab, setActiveTab] = useState('controls');

  const updateParam = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPreset = (preset) => {
    setParams(preset);
  };

  return (
    <div className="h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Main Workspace */}
      <main className="flex-grow w-full grid grid-cols-1 lg:grid-cols-12 items-stretch z-10 overflow-hidden">
        {/* Left - Interactive Viewer */}
        <div className="lg:col-span-9 flex flex-col p-6 relative min-h-0 justify-between">

          {/* Interactive Container holding EvilEye component */}
          <div className="w-full flex-grow relative flex items-center justify-center rounded-xl overflow-hidden my-8">
            <div className="absolute top-4 left-4 z-20">
              <span className="text-xs font-mono uppercase bg-black/80 border border-zinc-800 px-3 py-1.5 rounded-full text-zinc-400 backdrop-blur-md">
                GL Canvas Live Preview
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`text-xs px-2.5 py-1.5 rounded-md border font-medium transition-all ${
                    params.name === preset.name
                      ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                      : 'bg-black/50 border-zinc-800 text-zinc-400 hover:text-slate-200'
                  }`}
                >
                  {preset.name.split(' ')[0]}
                </button>
              ))}
            </div>

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
            <div className="absolute inset-0 border border-cyan-500/5 pointer-events-none rounded-lg bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-500 border-t border-zinc-900 pt-4">
            <p>Move mouse over the canvas to interact with the pupil</p>
            <p className="font-mono">OGL WebGL Renderer</p>
          </div>
        </div>

        {/* Right - Control Panel */}
        <div className="lg:col-span-3 flex flex-col bg-zinc-900/40 border-l border-zinc-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 bg-black/40">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex-1 py-4 text-sm font-medium transition-all ${
                activeTab === 'controls'
                  ? 'border-b-2 border-cyan-400 text-cyan-400 bg-zinc-900/30'
                  : 'text-zinc-400 hover:text-slate-200'
              }`}
            >
              Control Parameters
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-4 text-sm font-medium transition-all ${
                activeTab === 'presets'
                  ? 'border-b-2 border-cyan-400 text-cyan-400 bg-zinc-900/30'
                  : 'text-zinc-400 hover:text-slate-200'
              }`}
            >
              Presets & Shader Info
            </button>
          </div>

          {/* Settings scroll area */}
          <div className="p-4 overflow-y-auto flex-grow space-y-4">
            <AnimatePresence mode="wait">
              {activeTab === 'controls' ? (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                {/* Color Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-300">Iris Color</label>
                    <span className="text-xs font-mono text-zinc-500">{params.eyeColor}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={params.eyeColor}
                      onChange={(e) => updateParam('eyeColor', e.target.value)}
                      className="w-10 h-10 rounded border border-zinc-700 bg-transparent cursor-pointer"
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      {['#FF6F37', '#1E40AF', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateParam('eyeColor', color)}
                          className="w-6 h-6 rounded-full border border-zinc-800 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scale */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Talisman Scale</label>
                    <span className="text-xs font-mono text-cyan-400">{params.scale.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.05"
                    value={params.scale}
                    onChange={(e) => updateParam('scale', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Light Intensity</label>
                    <span className="text-xs font-mono text-cyan-400">{params.intensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={params.intensity}
                    onChange={(e) => updateParam('intensity', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Pupil Size */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Pupil Size</label>
                    <span className="text-xs font-mono text-cyan-400">{params.pupilSize.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.2"
                    step="0.05"
                    value={params.pupilSize}
                    onChange={(e) => updateParam('pupilSize', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Iris Width */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Iris Width</label>
                    <span className="text-xs font-mono text-cyan-400">{params.irisWidth.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.01"
                    value={params.irisWidth}
                    onChange={(e) => updateParam('irisWidth', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Glow Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Glow Intensity</label>
                    <span className="text-xs font-mono text-cyan-400">{params.glowIntensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.5"
                    step="0.05"
                    value={params.glowIntensity}
                    onChange={(e) => updateParam('glowIntensity', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Flame Speed */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Flame / Noise Speed</label>
                    <span className="text-xs font-mono text-cyan-400">{params.flameSpeed.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="3.0"
                    step="0.1"
                    value={params.flameSpeed}
                    onChange={(e) => updateParam('flameSpeed', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Noise Scale */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Noise Distortion</label>
                    <span className="text-xs font-mono text-cyan-400">{params.noiseScale.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={params.noiseScale}
                    onChange={(e) => updateParam('noiseScale', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Pupil Follow */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Cursor Pupil Follow</label>
                    <span className="text-xs font-mono text-cyan-400">{params.pupilFollow.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.1"
                    value={params.pupilFollow}
                    onChange={(e) => updateParam('pupilFollow', Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Background color of shader */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Canvas Inner BG</label>
                    <span className="text-xs font-mono text-zinc-500">{params.backgroundColor}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={params.backgroundColor}
                      onChange={(e) => updateParam('backgroundColor', e.target.value)}
                      className="w-8 h-8 rounded border border-zinc-700 bg-transparent cursor-pointer"
                    />
                    <div className="flex gap-1.5">
                      {['#000000', '#020617', '#090514', '#170f0f', '#022c22'].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateParam('backgroundColor', color)}
                          className="w-6 h-6 rounded border border-zinc-800 hover:scale-105"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                </motion.div>
            ) : (
              <motion.div
                key="presets"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm text-slate-300 leading-relaxed"
              >
                <div>
                  <h4 className="font-semibold text-slate-100 mb-2">Preset Configurations</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          params.name === preset.name
                            ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-200'
                            : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-slate-200'
                        }`}
                      >
                        <p className="font-bold text-xs">{preset.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-1 font-mono">Color: {preset.eyeColor}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-4">
                  <h4 className="font-semibold text-slate-100 mb-2">How It Works</h4>
                  <p className="text-xs text-zinc-400 mb-3">
                    This component renders a custom WebGL fragment shader on a single triangle covering the viewport. The math models a procedural eye with fractal brownian motion (FBM) noise.
                  </p>
                  <ul className="text-xs text-zinc-400 list-disc pl-4 space-y-2">
                    <li><strong>Polar Mapping:</strong> Converts planar coordinates into polar coordinates to map the iris fibers radially.</li>
                    <li><strong>Procedural Noise:</strong> A multi-octave Value Noise function running in pure GLSL generates the organic flame/fluid effect.</li>
                    <li><strong>Dynamic Uniforms:</strong> JavaScript feeds mouse coordinates, aspect ratios, and configuration values into the WebGL program in real time.</li>
                  </ul>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-3 border-t border-zinc-900 text-center text-xs text-zinc-500 z-10 shrink-0">
        <p>creado por <a href="https://sebas-dev.vercel.app/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">sebastian vasquez echavarria</a></p>
      </footer>
    </div>
  );
}

export default App;
