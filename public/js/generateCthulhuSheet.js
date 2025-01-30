document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sheet").style.display = "none";
});

document.getElementById("generate").addEventListener("click", async () => {
  const sheet = await generateRandomSheet();
  if (sheet) {
    displaySheet(sheet);
    document.getElementById("sheet").style.display = "flex";
  }
});

const fetchData = async () => {
  const namesResponse = await fetch("/names");
  const surnamesResponse = await fetch("/surnames");
  const occupationsResponse = await fetch("/occupations");

  const names = await namesResponse.json();
  const surnames = await surnamesResponse.json();
  const occupations = await occupationsResponse.json();

  return [names, surnames, occupations];
};

const fetchRandomPic = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data.results[0];
};

const generateRandomSheet = async () => {
  const data = await fetchData();
  const names = data[0];
  const surnames = data[1];
  const occupations = data[2];

  const randomPic = await fetchRandomPic();
  const gender = randomPic.gender;
  const picture = randomPic.picture.large;

  const nameByGender = names.filter((name) => name.gender === gender);
  const randomName = nameByGender[randomIndex(nameByGender)].name;
  const randomSurname = surnames[randomIndex(surnames)].surname;
  const randomOccupation = occupations[randomIndex(occupations)].occupation;
  const randomStrength = roll3d6Times5();
  const randomConstitution = roll3d6Times5();
  const randomDexterity = roll3d6Times5();
  const randomPower = roll3d6Times5();
  const randomAppearance = roll3d6Times5();
  const randomLuck = roll3d6Times5();
  const randomIntelligence = roll2d6Plus6Times5();
  const randomEducation = roll2d6Plus6Times5();
  const randomSize = roll2d6Plus6Times5();
  const randomMove = calculateMove(randomDexterity, randomSize, randomStrength);

  return {
    picture: picture,
    name: randomName,
    surname: randomSurname,
    occupation: randomOccupation,
    strength: randomStrength,
    constitution: randomConstitution,
    dexterity: randomDexterity,
    power: randomPower,
    appearance: randomAppearance,
    luck: randomLuck,
    intelligence: randomIntelligence,
    education: randomEducation,
    size: randomSize,
    sanity: randomPower,
    move: randomMove,
    magicPoints: Math.floor(randomPower / 5),
    hitPoints: Math.floor((randomSize + randomConstitution) / 10),
  };
};

const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const roll3d6Times5 = () => {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.floor(Math.random() * 6 + 1);
  }
  return total * 5;
};

const roll2d6Plus6Times5 = () => {
  let total = 6;
  for (let i = 0; i < 2; i++) {
    total += Math.floor(Math.random() * 6 + 1);
  }
  return total * 5;
};

const calculateMove = (dexterity, size, strength) => {
  return dexterity > size && strength > size ? 9 : dexterity >= size ? 8 : 7;
};

const displaySheet = (sheet) => {
  document.getElementById("mainInfo").innerHTML = `
  <p><strong>Name:</strong> ${sheet.name} ${sheet.surname}</p>
  <p><strong>Occupation:</strong> ${sheet.occupation}</p>`;
  document.getElementById(
    "picture"
  ).innerHTML = `<img src="${sheet.picture}"/>`;
  document.getElementById("characteristics").innerHTML = `
  <p><strong>Strength(STR):</strong> ${sheet.strength}</p>
  <p><strong>Constitution(CON):</strong> ${sheet.constitution}</p>
  <p><strong>Dexterity(DEX):</strong> ${sheet.dexterity}</p>
  <p><strong>Intelligence(INT):</strong> ${sheet.intelligence}</p>
  <p><strong>Appearance(APP):</strong> ${sheet.appearance}</p>
  <p><strong>Education(EDU):</strong> ${sheet.education}</p>
  <p><strong>Size(SIZ):</strong> ${sheet.size}</p>
  <p><strong>Power(POW):</strong> ${sheet.power}</p>
  <p><strong>Move:</strong> ${sheet.move}</p>
  `;
  document.getElementById("hitPoints").innerHTML = `
  <p><strong>Hit Points</strong> ${sheet.hitPoints}</p>
  `;
  document.getElementById("luck").innerHTML = `
  <p><strong>Luck</strong><br>${sheet.luck}</p>
  `;
  document.getElementById("sanity").innerHTML = `
  <p><strong>Sanity</strong> ${sheet.sanity}</p>
  `;
  document.getElementById("magicPoints").innerHTML = `
  <p><strong>Magic Points</strong> ${sheet.magicPoints}</p>
  `;
};
