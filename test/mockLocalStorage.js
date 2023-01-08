function localStoreGold(gold) {
  const g = JSON.stringify(gold);
  localStorage.setItem("golds", g);
}

function getLocalGolds() {
  const g = localStorage.getItem("golds");
  let result = JSON.parse(g);
  if (result === null) {
    result = 0;
    localStoreGold(result);
  }
  return result;
}

function storeGolds(gold) {
  localStoreGold(gold);
}

export { localStoreGold, getLocalGolds, storeGolds };
