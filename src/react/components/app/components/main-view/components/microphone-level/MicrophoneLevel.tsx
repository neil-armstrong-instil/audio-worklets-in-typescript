import "./MicrophoneLevel.scss";
import {repeatMap} from "@src/utils/LoopFunctions";
import React from "react";
import type {FC} from "react";

interface Props {
  levelAsPercentage: number;
}

export const MicrophoneLevel: FC<Props> = (
  {
    levelAsPercentage
  }
) => {
  const baseClass = "microphoneLevelIndicator";

  return (
    <div className={baseClass}>
      {repeatMap(levelAsPercentage, (index) => (
        <div
          key={index}
          className={`${baseClass}__notch`}
        />
      ))}
    </div>
  );
};
