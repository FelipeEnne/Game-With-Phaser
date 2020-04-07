function localStoreGold(gold) {
  const g = JSON.stringify(gold);
  localStorage.setItem('golds', g);
}

function getLocalGolds() {
  const g = localStorage.getItem('golds');
  let result = JSON.parse(g);
  if (result === null) {
    result = [0, 0];
    localStoreGold(result);
  }
  return result;
}

function storeGolds(gold) {
  const localGold = getLocalGolds();
  localGold[0] = gold;
  localStoreGold(localGold);
}

export { localStoreGold, getLocalGolds, storeGolds };
