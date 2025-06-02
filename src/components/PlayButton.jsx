import React, { useRef } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const WIDTH = 200;
const HEIGHT = 50;

const PlayButton = ({ onClick, isActive }) => {
  const ref = useRef();

  const draw = (g, color = isActive ? 0x33cc33 : 0x808080) => {
    g.clear();
    g.beginFill(color);
    g.drawRoundedRect(0, 0, WIDTH, HEIGHT, 12);
    g.endFill();
  };

  return (
    <Container>
      <Graphics
        ref={ref}
        interactive={isActive}
        buttonMode={isActive}
        pointerdown={onClick}
        pointerover={isActive ? () => draw(ref.current, 0x55ee55) : null}
        pointerout={isActive ? () => draw(ref.current, 0x33cc33) : null}
        draw={(g) => draw(g)}
      />
      <Text
        text="Play"
        x={WIDTH / 2}
        y={HEIGHT / 2}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: "#ffffff",
            fontSize: 16,
            fontWeight: "bold",
          })
        }
      />
    </Container>
  );
};

export default PlayButton;
