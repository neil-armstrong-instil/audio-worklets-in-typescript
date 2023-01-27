import {useMicrophoneLevelDetector} from "@src/react/components/app/components/main-view/components/microphone-capture/hooks/UseMicrophoneLevelDetector";
import type {FC} from "react";
import type {OnMicrophoneLevelPercentageChanged} from "@src/react/components/app/components/main-view/components/microphone-capture/types/OnMicrophoneLevelPercentageChanged";

interface Props {
  onMicrophoneLevelPercentageChanged: OnMicrophoneLevelPercentageChanged;
}

export const MicrophoneCapture: FC<Props> = (
  {
    onMicrophoneLevelPercentageChanged
  }
) => {
  useMicrophoneLevelDetector(onMicrophoneLevelPercentageChanged);

  return null;
};
