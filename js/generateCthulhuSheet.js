document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sheet").style.display = "none";
});

document.getElementById("generate").addEventListener("click", async () => {
  const sheet = await generateRandomSheet();
  if (sheet) {
    displaySheet(sheet);
    document.getElementById("sheet").style.display = "block";
  }
});

const fetchData = async () => {
  const [namesResponse, surnamesResponse, occupationsResponse] =
    await Promise.all([
      fetch("http://localhost:3000/names"),
      fetch("http://localhost:3000/surnames"),
      fetch("http://localhost:3000/occupations"),
    ]);

  const [names, surnames, occupations] = await Promise.all([
    namesResponse.json(),
    surnamesResponse.json(),
    occupationsResponse.json(),
  ]);

  return { names, surnames, occupations };
};

const generateRandomSheet = async () => {
  const { names, surnames, occupations } = await fetchData();

  const randomName = names[randomIndex(names)].name;
  const randomSurname = surnames[randomIndex(surnames)].surname;
  const randomOccupations = occupations[randomIndex(occupations)].occupation;
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
    name: randomName,
    surname: randomSurname,
    occupations: randomOccupations,
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
  const sheetDiv = document.getElementById("sheet");
  sheetDiv.innerHTML = ` 
  <p><strong>Name:</strong> ${sheet.name} ${sheet.surname}</p>
  <p><strong>Occupation:</strong> ${sheet.occupations}</p>
  <p><strong>Strength(STR):</strong> ${sheet.strength}</p>
  <p><strong>Constitution(CON):</strong> ${sheet.constitution}</p>
  <p><strong>Dexterity(DEX):</strong> ${sheet.dexterity}</p>
  <p><strong>Intelligence(INT):</strong> ${sheet.intelligence}</p>
  <p><strong>Appearance(APP):</strong> ${sheet.appearance}</p>
  <p><strong>Education(EDU):</strong> ${sheet.education}</p>
  <p><strong>Size(SIZ):</strong> ${sheet.size}</p>
  <p><strong>Power(POW):</strong> ${sheet.power}</p>
  <p><strong>Magic Points:</strong> ${sheet.magicPoints}</p>
  <p><strong>Hit Points:</strong> ${sheet.hitPoints}</p>
  <p><strong>Sanity:</strong> ${sheet.sanity}</p>
  <p><strong>Luck:</strong> ${sheet.luck}</p>
  <p><strong>Move:</strong> ${sheet.move}</p>
  `;
};
