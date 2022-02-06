"use strict";
const list = [
  { id: 1, name: "abc" },
  { id: 2, name: "bcd" },
  { id: 3, name: "cde" },
  { id: 4, name: "def" },
];
const p = new Promise((resolve) => resolve(list));

const getName = async (_) => {
  const name = await p.then((res) => {
    const _name = res.filter((item) => {
      return item.id === _;
    });
    return _name[0].name;
  });

  return name;
};

const foreachTest = async () => {
  const itemList = await p;
  const nameList = [];
  console.log("--start--");
  await itemList.forEach(async (item) => {
    const name = await getName(item.id);
    nameList.push(name);
    console.log(name);
  });
  const nameList2 = await Promise.all(nameList);
  console.log(nameList2);
  console.log("--end--");
};

//foreachTest();

const mapTest = async () => {
  const itemList = await p;
  console.log("--start--");
  const nameList = await itemList.map(async (item) => {
    const name = await getName(item.id);
    console.log(name);
    return name;
  });
  const nameList2 = await Promise.all(nameList);
  console.log(nameList2);
  console.log("--end--");
};

//mapTest();

const filterNames = async () => {
  const itemList = await p;
  console.log("--start--");
  const pList = await itemList.map(async (item) => {
    const name = await getName(item.id);
    return name;
  });
  const nameList = await Promise.all(pList);
  const filteredList = itemList.filter((res, i) => {
    const name = nameList[i];
    console.log(name);
    return name.indexOf("e") >= 0;
  });
  console.log(filteredList);
  console.log("--end--");
};

//filterNames();

const reduceId = async () => {
  const itemList = await p;
  console.log("--start--");
  const pList = await itemList.map(async (item) => {
    const name = await getName(item.id);
    return name;
  });
  const nameList = await Promise.all(pList);
  const nameScore = nameList.reduce((accu, curr) => {
    console.log(curr);
    const score = curr.split("").reduce((_a, _c) => {
      return _a + _c.charCodeAt(0);
    }, 0);
    return accu + score;
  }, 0);
  console.log(nameScore);
  console.log("--end--");
};

reduceId();
