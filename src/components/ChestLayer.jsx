import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Container } from "@pixi/react";
import ChestButton from "./ChestButton";

const ChestLayer = forwardRef(({ x, y, isActive, onChestClick }, ref) => {
  const cols = 3;
  const rows = 2;
  const buttonSpacingX = 275;
  const buttonSpacingY = 200;
  const [labels, setLabels] = useState(Array(rows * cols).fill(""));
  const [activeStates, setActiveStates] = useState(
    Array(rows * cols).fill(true)
  );

  useImperativeHandle(ref, () => ({
    resetTexts: () => {
      setLabels(Array(rows * cols).fill(""));
      setActiveStates(Array(rows * cols).fill(true));
    },
    revealChest: (index, reward) => {
      const updatedLabels = [...labels];
      updatedLabels[index] = reward;
      setLabels(updatedLabels);

      const updatedActive = [...activeStates];
      updatedActive[index] = false;
      setActiveStates(updatedActive);
    },
  }));

  return (
    <Container x={x} y={y}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <ChestButton
            key={i}
            x={col * buttonSpacingX}
            y={row * buttonSpacingY}
            label={labels[i]}
            isClicked={!activeStates[i]}
            isActive={isActive && activeStates[i]}
            onClick={() => {
              if (isActive && activeStates[i]) onChestClick(i);
            }}
          />
        );
      })}
    </Container>
  );
});

export default ChestLayer;
