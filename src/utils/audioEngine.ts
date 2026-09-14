// Web Audio API organic ambient sound generator
// Generates soothing nature soundscapes in real-time without external audio files

class NatureAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentType: string | null = null;
  private activeNodes: { [key: string]: any } = {};
  private masterGain: GainNode | null = null;
  private volume = 0.7;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      Object.keys(this.activeNodes).forEach((key) => {
        const item = this.activeNodes[key];
        if (item) {
          if (item.stop) item.stop();
          if (item.disconnect) item.disconnect();
          if (item.timer) clearInterval(item.timer);
        }
      });
    } catch (e) {
      console.warn('Audio cleanup error:', e);
    }
    this.activeNodes = {};
    this.isPlaying = false;
    this.currentType = null;
  }

  public play(type: 'cicadas' | 'rain' | 'ocean' | 'stream' | 'hearth' | 'wind') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentType = type;

    switch (type) {
      case 'cicadas':
        this.startCicadas();
        break;
      case 'rain':
        this.startRain();
        break;
      case 'ocean':
        this.startOcean();
        break;
      case 'stream':
        this.startStream();
        break;
      case 'hearth':
        this.startHearth();
        break;
      case 'wind':
        this.startWind();
        break;
      default:
        this.startCicadas();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentType(): string | null {
    return this.currentType;
  }

  // --- Cicadas (Summer in the Valley) ---
  private startCicadas() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    // Buffer noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Bandpass filter for high pitched insect buzz
    const bandpass1 = ctx.createBiquadFilter();
    bandpass1.type = 'bandpass';
    bandpass1.frequency.value = 4500;
    bandpass1.Q.value = 8;

    const bandpass2 = ctx.createBiquadFilter();
    bandpass2.type = 'bandpass';
    bandpass2.frequency.value = 6800;
    bandpass2.Q.value = 6;

    // AM Modulator (rhythmic pulsing of cicadas)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.8; // 0.8 Hz slow wave

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.5;

    const subLfo = ctx.createOscillator();
    subLfo.type = 'sawtooth';
    subLfo.frequency.value = 16; // Fast flutter

    const cicadaGain = ctx.createGain();
    cicadaGain.gain.value = 0.35;

    // Soft warm meadow drone
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'triangle';
    droneOsc.frequency.value = 174.61; // F3 warm tone
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.04;

    // Soft high chime
    const chimeOsc = ctx.createOscillator();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.value = 523.25; // C5
    const chimeGain = ctx.createGain();
    chimeGain.gain.value = 0.015;

    noise.connect(bandpass1);
    noise.connect(bandpass2);

    bandpass1.connect(cicadaGain);
    bandpass2.connect(cicadaGain);
    cicadaGain.connect(this.masterGain);

    droneOsc.connect(droneGain);
    droneGain.connect(this.masterGain);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    lfo.connect(lfoGain);
    lfoGain.connect(cicadaGain.gain);

    noise.start();
    lfo.start();
    subLfo.start();
    droneOsc.start();
    chimeOsc.start();

    this.activeNodes = { noise, lfo, subLfo, droneOsc, chimeOsc };
  }

  // --- Rain in the Forest ---
  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = buffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 1200;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.45;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    rainSource.start();

    // Occasional gentle water drops
    const dropTimer = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      try {
        const dropOsc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        const startFreq = 800 + Math.random() * 1200;
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
        dropOsc.frequency.exponentialRampToValueAtTime(startFreq * 0.3, this.ctx.currentTime + 0.08);

        dropGain.gain.setValueAtTime(0.04 + Math.random() * 0.05, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        dropOsc.connect(dropGain);
        dropGain.connect(this.masterGain);
        dropOsc.start();
        dropOsc.stop(this.ctx.currentTime + 0.09);
      } catch (e) {}
    }, 450);

    this.activeNodes = { rainSource, dropTimer };
  }

  // --- Ocean Breeze ---
  private startOcean() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 350;
    filter.Q.value = 1.5;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12; // Slow rolling waves (~8 sec cycle)

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;

    lfo.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0.55;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes = { noise, lfo };
  }

  // --- Babbling Stream ---
  private startStream() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.value = 650;
    filter1.Q.value = 2.0;

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.value = 1400;
    filter2.Q.value = 3.0;

    const streamGain = ctx.createGain();
    streamGain.gain.value = 0.38;

    noise.connect(filter1);
    noise.connect(filter2);
    filter1.connect(streamGain);
    filter2.connect(streamGain);
    streamGain.connect(this.masterGain);

    noise.start();
    this.activeNodes = { noise };
  }

  // --- Evening Hearth ---
  private startHearth() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const lowFilter = ctx.createBiquadFilter();
    lowFilter.type = 'lowpass';
    lowFilter.frequency.value = 300;

    const lowGain = ctx.createGain();
    lowGain.gain.value = 0.4;

    noise.connect(lowFilter);
    lowFilter.connect(lowGain);
    lowGain.connect(this.masterGain);
    noise.start();

    // Wood crackle generator
    const crackleTimer = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) return;
      try {
        const crackleOsc = this.ctx.createOscillator();
        const crackleGain = this.ctx.createGain();
        crackleOsc.type = 'square';
        crackleOsc.frequency.setValueAtTime(150 + Math.random() * 600, this.ctx.currentTime);

        crackleGain.gain.setValueAtTime(0.08 + Math.random() * 0.08, this.ctx.currentTime);
        crackleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(this.masterGain);
        crackleOsc.start();
        crackleOsc.stop(this.ctx.currentTime + 0.035);
      } catch (e) {}
    }, 180);

    this.activeNodes = { noise, crackleTimer };
  }

  // --- Pine Forest Wind ---
  private startWind() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 2.5;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;

    lfo.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0.35;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes = { noise, lfo };
  }
}

export const natureAudio = new NatureAudioEngine();
