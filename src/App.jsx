import React, { useEffect, useState, useRef } from "react";
import { Sprite, Stage } from "@pixi/react";
import ChestLayer from "./components/ChestLayer";
import PlayLayer from "./components/PlayLayer";
import WinPopup from "./components/WinPopup";
import { loadAllAssets } from "./utils/assets";
import { getChestReward } from "./utils/reward";

const App = () => {
  const chestRef = useRef();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [chestsActive, setChestsActive] = useState(false);
  const [playEnabled, setPlayEnabled] = useState(true);
  const [popup, setPopup] = useState({
    visible: false,
    chestIndex: null,
    message: "",
  });
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    loadAllAssets().then(() => setAssetsLoaded(true));
  }, []);

  const handlePlay = () => {
    chestRef.current?.resetTexts();
    setRevealedCount(0);
    setChestsActive(true);
    setPlayEnabled(false);
  };

  const handleChestClick = (index) => {
    if (!chestsActive) return;

    const reward = getChestReward();

    // Reveal label directly on the button
    chestRef.current?.revealChest(index, reward);

    const newCount = revealedCount + 1;
    setRevealedCount(newCount);

    if (newCount === 6) {
      setPlayEnabled(true);
      setChestsActive(false);
    }

    // Show popup only if it's BonusWin
    if (reward === "BonusWin") {
      setPopup({
        visible: true,
        chestIndex: null,
        message: "Bonus Win! Congratulations!",
        countTo: 1000,
      });
    }
  };

  if (!assetsLoaded) return <div>Loading...</div>;

  return (
    <Stage width={800} height={600} options={{ backgroundAlpha: 0 }}>
      <Sprite image="background.jpg" x={0} y={0} width={800} height={600} />
      <ChestLayer
        ref={chestRef}
        x={50}
        y={50}
        isActive={chestsActive}
        onChestClick={handleChestClick}
      />
      <PlayLayer x={300} y={450} onReset={handlePlay} isActive={playEnabled} />
      {popup.visible && (
        <WinPopup
          message={popup.message}
          onConfirm={() => setPopup({ visible: false })}
          countTo={popup.countTo}
        />
      )}
    </Stage>
  );
};

export default App;
