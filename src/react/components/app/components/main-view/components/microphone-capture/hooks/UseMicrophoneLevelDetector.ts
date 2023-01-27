import {useEffect} from "react";
import type {OnMicrophoneLevelPercentageChanged} from "@src/react/components/app/components/main-view/components/microphone-capture/types/OnMicrophoneLevelPercentageChanged";

const intervalInMilliseconds = 250;

// Based on https://stackoverflow.com/a/62732195
export function useMicrophoneLevelDetector(onMicrophoneLevelPercentageChanged: OnMicrophoneLevelPercentageChanged): void {
  useEffect(() => {
    const audioContext = new AudioContext();
    let audioSource: MediaStreamAudioSourceNode | undefined = undefined;
    let node: AudioWorkletNode | undefined = undefined;

    // Register the javascript file found in the `public` folder as an audio worklet
    audioContext.audioWorklet.addModule("./RegisterAudioWorklet.js").then(() => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then((audioStream) => {
        audioSource = audioContext.createMediaStreamSource(audioStream);

        // Need to match the name of the class defined in the javascript file
        node = new AudioWorkletNode(audioContext, "VolumeMeter");

        // Can post some configuration to the audio worklet javascript file
        node.port.postMessage({updateIntervalInMilliseconds: intervalInMilliseconds});

        // Communication from the audio worklet javascript file
        node.port.onmessage = event => {
          const volume = event.data.volume;
          if (!volume) return;

          const scalingFactor = 1000; // Can tweak this
          const volumePercentage = volume * scalingFactor;

          // Not sure how to correctly scale this yet, as it's just playing around with the result from AudioWorkletProcessor
          if (volumePercentage > 100) {
            onMicrophoneLevelPercentageChanged(100);
            return;
          }

          onMicrophoneLevelPercentageChanged(volumePercentage);
        };

        audioSource.connect(node).connect(audioContext.destination);
      });
    });

    return () => {
      audioSource?.disconnect();
      node?.disconnect();
    };
  }, [onMicrophoneLevelPercentageChanged]);
}
