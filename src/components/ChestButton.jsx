import React, { useRef, useState, useLayoutEffect } from "react";
import { Container, Sprite, Text, Graphics } from "@pixi/react";
import { ColorMatrixFilter } from "pixi.js";
import * as PIXI from "pixi.js";

const WIDTH = 150;
const HEIGHT = 150;

const ChestButton = ({ key, x, y, onClick, isActive, label, isClicked }) => {
  const maskRef = useRef();
  const [maskObj, setMaskObj] = useState(null);

  const grayFilter = new ColorMatrixFilter();
  grayFilter.desaturate();

  useLayoutEffect(() => {
    if (maskRef.current) {
      setMaskObj(maskRef.current);
    }
  }, []);

  const getTextureByLabel = (label) => {
    switch (label) {
      case "0$":
        return PIXI.Texture.from("/chest_loss.jpg");
      default:
        return PIXI.Texture.from("/chest_won.jpg");
    }
  };

  const texture =
    isClicked && label
      ? getTextureByLabel(label)
      : PIXI.Texture.from("/chest_closed.jpg");

  return (
    <Container x={x} y={y}>
      <Sprite
        key={key}
        texture={texture}
        width={WIDTH}
        height={HEIGHT}
        mask={maskRef.current}
        interactive={isActive}
        buttonMode={isActive}
        pointerdown={onClick}
        filters={!isActive ? [grayFilter] : []}
      />

      {/* Rounded rectangle mask */}
      <Graphics
        ref={maskRef}
        draw={(g) => {
          g.clear();
          g.beginFill(0xffffff);
          g.drawRoundedRect(0, 0, WIDTH, HEIGHT, 10);
          g.endFill();
        }}
      />

      {/* Optional label */}
      {label && (
        <Text
          key={key}
          text={label}
          x={WIDTH / 2}
          y={HEIGHT / 2}
          anchor={0.5}
          style={
            new PIXI.TextStyle({
              fill: label === "0$" ? "#FF0000" : "#008000",
              fontSize: 50,
              fontWeight: "bold",
              dropShadow: true,
              dropShadowColor: "#ffffff",
              dropShadowAngle: 0,
              dropShadowBlur: 3,
              dropShadowDistance: 0,
            })
          }
        />
      )}
    </Container>
  );
};

export default ChestButton;
