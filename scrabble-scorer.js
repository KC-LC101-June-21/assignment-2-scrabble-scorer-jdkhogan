// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble! \nEnter a word: ");

   
};

function simpleScore(word) {
	return word.length;
}

function vowelBonusScore(word){
  word = word.toUpperCase();
	let letterPoints = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];

	for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) { 
      letterPoints += 3;
    } else { 
      letterPoints += 1; }
  }
	return letterPoints;
}


function scrabbleScore(word) {
	word = word.toLowerCase();
	let letterPoints = 0;
  let letter = "";
 
	for (let i = 0; i < word.length; i++) {
    letter = word[i];
    letterPoints += newPointStructure[letter];
		 }
	  
	return letterPoints;
 }


const scoringAlgorithms = [
  {
    name: 'Simple Score', description: 'Each letter is worth 1 point.', scoringFunction: simpleScore
  }, 
  {
    name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scoringFunction: vowelBonusScore
  },
  {
    name: 'Scrabble', description: 'The traditional scoring algorithm.', scoringFunction: scrabbleScore
  }
  ];


function scorerPrompt() {
  let scoringPrompt = "\nChoose a Scrabble scoring algorithm:\n";
  for (i = 0; i < scoringAlgorithms.length; i++) {
    scoringPrompt = scoringPrompt + `${i}: ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}\n`
  } // builds scorer prompt question

  let scorer = Number(input.question(scoringPrompt));
  
  while ([0,1,2].includes(scorer) === false || isNaN(scorer)) {
    console.log('\nInvalid entry.')
    scorer = Number(input.question(scoringPrompt));
  }
  
  return scoringAlgorithms[scorer];
}


function transform(oldPointStructure) {
  let out = {};
  let key = "";

  for (points in oldPointStructure) {
    for (letter in oldPointStructure[points]) {
      key = oldPointStructure[points][letter].toLowerCase();
      out[key] = Number(points);
    }
  }
  
  out[' '] = 0;

  return out;
};


let newPointStructure = transform(oldPointStructure);


function wordIsInvalid(word) {
  let letter = "";
  
  for (i in word) {
    letter = word[i];
    if (!(letter in newPointStructure)) {
      return true;
    }
  }
  return false;
}


function runProgram() {
  let word = initialPrompt();

  while (wordIsInvalid(word)) {
    console.log(`\nInvalid entry: '${word}'\nPlease use only letters and spaces.\n`)
    word = initialPrompt();
  }

  let scorer = scorerPrompt();

  console.log(`\nScore for '${word}' using ${scorer.name} scorer: \n${scorer.scoringFunction(word)}`); 
  
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};