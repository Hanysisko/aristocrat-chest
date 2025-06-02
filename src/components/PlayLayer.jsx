import React from "react";
import { Container } from "@pixi/react";
import PlayButton from "./PlayButton";

const PlayLayer = ({ x, y, onReset, isActive }) => (
  <Container x={x} y={y}>
    <PlayButton onClick={onReset} isActive={isActive} />
  </Container>
);

export default PlayLayer;
