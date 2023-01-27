import "./MainView.scss";
import type {FC} from "react";
import React, {useState} from "react";
import {MicrophoneCapture} from "@src/react/components/app/components/main-view/components/microphone-capture/MicrophoneCapture";
import {MicrophoneLevel} from "@src/react/components/app/components/main-view/components/microphone-level/MicrophoneLevel";

export const MainView: FC = () => {
  const [microphoneLevelPercentage, setMicrophoneLevelPercentage] = useState(0);

  return (
    <div className="mainView">
      <MicrophoneCapture
        onMicrophoneLevelPercentageChanged={setMicrophoneLevelPercentage}
      />

      <MicrophoneLevel
        levelAsPercentage={microphoneLevelPercentage}
      />
    </div>
  );
};
