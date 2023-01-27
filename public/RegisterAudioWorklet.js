// Based on https://stackoverflow.com/a/62732195
class VolumeMeter extends AudioWorkletProcessor {
  volume = 0;
  updateIntervalInMilliseconds = 25;
  nextUpdateFrame = this.updateIntervalInMilliseconds;
  smoothingFactor = 0.8;

  constructor() {
    super();

    this.port.onmessage = event => {
      // Here typescript can define the update interval via message passing on the port
      const intervalFromEvent = event.data.updateIntervalInMilliseconds;
      if (!intervalFromEvent) return;

      this.updateIntervalInMilliseconds = intervalFromEvent;
    };
  }

  get intervalInFrames() {
    // The sample rate is provided by the AudioWorkletProcessor class
    return this.updateIntervalInMilliseconds / 1000 * sampleRate;
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length === 0) return true;

    const amplitudes = input[0];
    let squaredSum = 0;
    for (let i = 0; i < amplitudes.length; ++i) {
      const amplitude = amplitudes[i];
      squaredSum += amplitude * amplitude;
    }

    const rootMeanSquare = Math.sqrt(squaredSum / amplitudes.length);
    this.volume = Math.max(rootMeanSquare, this.volume * this.smoothingFactor);

    this.nextUpdateFrame -= amplitudes.length;
    if (this.nextUpdateFrame < 0) {
      this.nextUpdateFrame += this.intervalInFrames;
      this.port.postMessage({volume: this.volume});
    }

    return true;
  }
}

registerProcessor(VolumeMeter.name, VolumeMeter);
