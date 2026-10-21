function localStoreGold(gold) {
  const g = JSON.stringify(gold);
  localStorage.setItem("golds", g);
}

function getLocalGolds() {
  const g = localStorage.getItem("golds");
  let result;
  try {
    result = JSON.parse(g);
  } catch (error) {
    result = 0;
  }
  if (!Number.isSafeInteger(result) || result < 0) result = 0;
  if (g === null || result === 0) localStoreGold(result);
  return result;
}

function storeGolds(gold) {
  const safeGold = Number.isSafeInteger(gold) && gold >= 0 ? gold : 0;
  localStoreGold(safeGold);
}

export { localStoreGold, getLocalGolds, storeGolds };
