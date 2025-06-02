import { Assets } from 'pixi.js';

export const ASSET_LIST = {
  chestClosed: 'chest_closed.jpg',
  chestWin: 'chest_won.jpg',
  chestLoss: 'chest_loss.jpg',
  background: 'background.jpg',
};

export const loadAllAssets = async () => {
  return Assets.load(Object.values(ASSET_LIST));
};