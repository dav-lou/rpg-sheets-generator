document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sheet").style.display = "none";
});

document.getElementById("generate").addEventListener("click", () => {
  const sheet = generateRandomSheet();
  displaySheet(sheet);
  document.getElementById("sheet").style.display = "block";
});

const generateRandomSheet = () => {
  const names = [
    // Male
    "Albert",
    "Arthur",
    "Benjamin",
    "Charles",
    "Claude",
    "Clarence",
    "Edgar",
    "Edward",
    "Frank",
    "George",
    "Harry",
    "Jack",
    "James",
    "John",
    "Joseph",
    "Louis",
    "Martin",
    "Richard",
    "Robert",
    "Samuel",
    "Thomas",
    "Walter",
    "William",

    // Female
    "Agnes",
    "Alice",
    "Anna",
    "Bernice",
    "Catherine",
    "Clara",
    "Dorothy",
    "Eleanor",
    "Elizabeth",
    "Ella",
    "Ethel",
    "Flora",
    "Frances",
    "Helen",
    "Irene",
    "Jane",
    "Lillian",
    "Louise",
    "Margaret",
    "Martha",
    "Mary",
    "Nellie",
    "Ruth",
    "Virginia",
    "Wilhelmina",
  ];

  const surnames = [
    "Adams",
    "Allen",
    "Anderson",
    "Bailey",
    "Baker",
    "Barnes",
    "Becker",
    "Bell",
    "Bennett",
    "Bianchi",
    "Brooks",
    "Brown",
    "Brownie",
    "Butler",
    "Campbell",
    "Carter",
    "Clark",
    "Coleman",
    "Collins",
    "Cooper",
    "Edwards",
    "Esposito",
    "Evans",
    "Fedorov",
    "Ferrari",
    "Fischer",
    "Foster",
    "Garcia",
    "Gonzales",
    "Gray",
    "Green",
    "Hall",
    "Harris",
    "Hayes",
    "Henderson",
    "Hill",
    "Hoffman",
    "Howard",
    "Ivanov",
    "Jackson",
    "Jameson",
    "Jenkins",
    "Johnson",
    "Jones",
    "King",
    "Kuznetsov",
    "Lewis",
    "Martin",
    "Meyer",
    "Miller",
    "Mitchell",
    "Moore",
    "Morris",
    "Müller",
    "Morgan",
    "Murphy",
    "Nelson",
    "Patterson",
    "Perez",
    "Phillips",
    "Popov",
    "Powell",
    "Price",
    "Ramirez",
    "Reed",
    "Richardson",
    "Rivera",
    "Roberts",
    "Rogers",
    "Rossi",
    "Russo",
    "Sidorov",
    "Schmidt",
    "Schneider",
    "Smirnov",
    "Smith",
    "Sokolov",
    "Stewart",
    "Taylor",
    "Thomas",
    "Thompson",
    "Turner",
    "Vasiliev",
    "Walker",
    "Wander",
    "Watson",
    "Weber",
    "White",
    "Wilson",
    "Wright",
    "Young",
  ];
  
  const occupations = [
    "Academic",
    "Actor",
    "Antiquarian",
    "Artist",
    "Athlete",
    "Criminal",
    "Detective",
    "Doctor",
    "Engineer",
    "Farmer",
    "Grave Digger",
    "Historian",
    "Journalist",
    "Lawyer",
    "Librarian",
    "Medician",
    "Military Officer",
    "Musician",
    "Private Investigator",
    "Professor",
    "Pugilist",
    "Scientist",
    "Soldier",
    "Street Urchin",
    "Surgeon",
    "Thief",
    "Veterinarian",
    "Writer",
  ];

  const randomName = names[randomIndex(names)];
  const randomSurname = surnames[randomIndex(surnames)];
  const randomOccupations = occupations[randomIndex(occupations)];

  return {
    name: randomName,
    surname: randomSurname,
    occupations: randomOccupations,
    strength: roll3d6(),
    constitution: roll3d6(),
    dexterity: roll3d6(),
    power: roll3d6(),
    appearance: roll3d6(),
  };
};

const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const roll3d6 = () => {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.floor(Math.random() * 6 + 1);
  }
  return total * 5;
};

const displaySheet = (sheet) => {
  const sheetDiv = document.getElementById("sheet");
  sheetDiv.innerHTML = ` 
  <p><strong>Name:</strong> ${sheet.name} ${sheet.surname}</p>
  <p><strong>Occupation:</strong> ${sheet.occupations}</p>
  <p><strong>Strength:</strong> ${sheet.strength}</p>
  <p><strong>Constitution:</strong> ${sheet.constitution}</p>
  <p><strong>Power:</strong> ${sheet.power}</p>
  <p><strong>Appearance:</strong> ${sheet.appearance}</p>
  `;
};
