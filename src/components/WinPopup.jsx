import React, { useEffect, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const WinPopup = ({ x = 100, y = 100, onConfirm, countTo = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 3000; // 1 second
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * countTo);
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
      }
    };

    requestAnimationFrame(animate);
  }, [countTo]);

  return (
    <Container x={x} y={y}>
      {/* Popup Background */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.8);
          g.drawRoundedRect(0, 0, 600, 400, 20);
          g.endFill();
        }}
      />

      {/* Title */}
      <Text
        text="🎉 Bonus Win!"
        x={300}
        y={100}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: "#ffffff",
            fontSize: 50,
            fontWeight: "bold",
          })
        }
      />

      {/* Count-up animated number */}
      <Text
        text={`$${count}`}
        x={300}
        y={200}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: "#ffff66",
            fontSize: 32,
            fontWeight: "bold",
          })
        }
      />

      {/* OK button */}
      <Graphics
        visible={count === 1000 ? true : false}
        interactive={true}
        buttonMode={true}
        pointerdown={onConfirm}
        draw={(g) => {
          g.clear();
          g.beginFill(0x4444aa);
          g.drawRoundedRect(200, 300, 200, 50, 10);
          g.endFill();
        }}
      />
      <Text
        visible={count === 1000 ? true : false}
        text="OK"
        x={300}
        y={325}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: "#ffffff",
            fontSize: 16,
            fontWeight: "bold",
          })
        }
        interactive={true}
        buttonMode={true}
        pointerdown={onConfirm}
      />
    </Container>
  );
};

export default WinPopup;
