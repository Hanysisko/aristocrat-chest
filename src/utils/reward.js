export function getChestReward() {
  const roll = Math.random();
  if (roll < 0.5) return '0$';
  if (roll < 0.7) return '20$';
  if (roll < 0.9) return '50$';
  return 'BonusWin';
}