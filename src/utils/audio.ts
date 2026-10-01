// Web Audio API engine sound synthesizer for realistic supercar throttle
class EngineSoundEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isMuted: boolean = true;
  private targetFreq: number = 55;
  private currentFreq: number = 55;

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.osc = this.ctx.createOscillator();
      this.osc.type = 'sawtooth';
      this.osc.frequency.setValueAtTime(55, this.ctx.currentTime);

      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'triangle';
      this.subOsc.frequency.setValueAtTime(27.5, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      this.osc.connect(this.filter);
      this.subOsc.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start();
      this.subOsc.start();
    } catch {
      // Audio not supported
    }
  }

  toggleSound(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setTargetAtTime(this.isMuted ? 0 : 0.08, now, 0.05);
    }
    return !this.isMuted;
  }

  updateVelocity(velocity: number) {
    if (this.isMuted || !this.ctx || !this.osc || !this.subOsc || !this.filter || !this.gainNode) return;
    const absVel = Math.min(Math.abs(velocity), 100);
    const normalized = absVel / 100;
    this.targetFreq = 50 + normalized * 180;
    this.currentFreq += (this.targetFreq - this.currentFreq) * 0.2;

    const now = this.ctx.currentTime;
    this.osc.frequency.setTargetAtTime(this.currentFreq, now, 0.05);
    this.subOsc.frequency.setTargetAtTime(this.currentFreq / 2, now, 0.05);
    this.filter.frequency.setTargetAtTime(300 + normalized * 1200, now, 0.05);

    const baseGain = 0.04 + normalized * 0.08;
    this.gainNode.gain.setTargetAtTime(baseGain, now, 0.05);
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}

export const engineSound = new EngineSoundEngine();
