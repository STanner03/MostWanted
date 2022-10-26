/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()
let personTemplate = 
     {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "gender": "",
        "dob": "",
        "height": 0,
        "weight": 0,
        "eyeColor": "",
        "occupation": "",
        "parents": [],
        "currentSpouse": 0
    }

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}

function searchByTraits(people) {
    let multipleTraitSearch = parseInt(promptFor("Do you want to search for a single trait or multiple traits?\nInput:\n1 for single trait\n2 for multiple traits.", chars));
    switch (multipleTraitSearch) {
        case 1:
            let traitSearch = promptFor("Please choose the desired criteria to search by;\nGender:\nDoB:\nHeight:\nWeight:\nEye Color:\nOccupation:", chars).toLowerCase();
            switch (traitSearch) {
                case "gender":
                    let genderChoice = searchByGender(people)
                    confirmChoice(genderChoice, people);
                    return genderChoice;
                case "dob":
                    let dobChoice = searchByDOB(people)
                    confirmChoice(dobChoice, people);
                    return dobChoice;
                case "height":
                    let heightChoice = searchByHeight(people)
                    confirmChoice(heightChoice, people);
                    return heightChoice;
                case "weight":
                    let weightChoice = searchByWeight(people)
                    confirmChoice(weightChoice, people);
                    return weightChoice;
                case "eye color":
                    let eyeColorChoice = searchByEyeColor(people)
                    confirmChoice(eyeColorChoice, people);
                    return eyeColorChoice;
                case "occupation":
                    let occupationChoice = searchByOccupation(people)
                    confirmChoice(occupationChoice, people);
                    return occupationChoice;
                case "restart":
                    app(people);
                    break;
                case "quit":
                    return;
                default:
                    return searchByTraits(person, people);        
            }
            break;
        case 2:
            confirmChoice(multipleTraits(people), people);
    }

}

/**
 * 
 * @param {{}} person 
 * @param {[]} people 
 * @returns 
 */

function multipleTraits(people){
    let traits = promptFor("Please select the criteria for searching\nGender:\nDoB:\nHeight:\nWeight:\nEye Color:\nOccupation:\nPlease separate choices with commas but NO SPACES!!!\n(i.e.) gender,height,eye color...", chars).toLowerCase();
    let traitsArray = traits.split(",");
    traitsArray.map(function(el){
        switch(el){
            case "gender":
                people= searchByGender(people)
                break;
            case "dob":
                people = searchByDOB(people)
                break;
            case "height":
                people = searchByHeight(people)
                break;
            case "weight":
                people = searchByWeight(people)
                break;
            case "eye color":
                people = searchByEyeColor(people)
                break;
            case "occupation":
                people = searchByOccupation(people)
                break;
            default:
                return multipleTraits(people);
        }
        alert(returnPeople(people));
    })
    return people;

}


function confirmChoice(param1, people){
    let newArray = returnPeople(param1)
    let traitResults = promptFor(`Is the person in the list?\n${newArray}`, chars);
    let searchResults;
    switch (traitResults) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            searchResults = searchByTraits(param1);
            break;
        default:
            searchByTraits(people);
            break;
    }
}


function searchByGender(people = [personTemplate]) {
    let generInput = promptFor("Is the person you're looking for Male or Female?", chars).toLowerCase();
    let personGender = people.filter((el) => {
        return generInput === el.gender
    })
    return personGender;
}

function searchByDOB(people) {
    let dobInput = promptFor("What is the DoB of the person you're looking for? i.e. mm/dd/yyy", chars).toLowerCase();
    let personDOB = people.filter((el) => {
        return dobInput === el.dob
    })
    return personDOB;
}

function searchByHeight(people){
    let heightInput = parseInt(promptFor("What is the Height, in inches, of the person you are looking for? i.e. 69 or 65", chars));
    let personHeight = people.filter((el) => {
        return heightInput === el.height
    })
    return personHeight;
}

function searchByWeight(people){
    let weightInput = parseInt(promptFor("What is the Weight, in pounds, of the person you are looking for? i.e. 155 or 192", chars));
    let personWeight = people.filter((el) => {
        return weightInput === el.weight
    })
    return personWeight
}

function searchByEyeColor(people){
    let eyeColorInput = promptFor("What is the Eye Color of the person you are looking for?", chars).toLowerCase();
    let personEyeColor = people.filter((el) => {
        return eyeColorInput === el.eyeColor
    })
    return personEyeColor
}

function searchByOccupation(people){
    let occupationInput = promptFor("What is the Occupation of the person you are looking for?", chars).toLowerCase();
    let personOccupation = people.filter((el) => {
        return occupationInput === el.occupation
    })
    return personOccupation
}





// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    const fullNames = people
    .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
    })
    .join("\n")

    alert(fullNames);
}

function returnPeople(people) {
    {
        const fullNames = people
        .map((person) => {
            return `${person.firstName} ${person.lastName}`;
        })
        .join("\n")
    
        return(fullNames);
    }
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}

function findPersonFamily(person, people) {
    let parents = returnPeople(findParents(person, people));
    let spouse = returnPeople(findSpouse(person, people));
    let siblings = returnPeople(findSiblings(person, people));

    return (`Parents:\n${parents}\n\nSpouse:\n${spouse}\n\nSiblings:\n${siblings}`);
}

/**
 * 
 * @param {{}} person 
 * @param {[]} people 
 * @returns 
 */
function findParents(person, people) {
    let parents = people.filter(

        (el) => {
       return person.parents.includes(el.id) 
    }
    
    )
    return parents;
}


/**
 * 
 * @param {{}} person 
 * @param {[]} people 
 * @returns 
 */

function findSpouse(person, people) {
    let spouse = people.filter(
        
        (el) => {
            return person.currentSpouse === el.id
        }
        
        )
        return spouse;
    }
    
 /**
  * 
  * @param {{}} person 
  * @param {[]} people 
  * @returns 
 */

function findSiblings(person, people) 
{
    let siblings = people.filter((el) => {

        return (person.parents[0] === el.parents[0] && person.parents[1] === el.parents[1]
         || person.parents[0] === el.parents[1] && person.parents[1] === el.parents[0])
         && el.id !== person.id

         })

    return siblings; 
}



function findPersonDescendants(person, people) {
    let children = people.filter((el) => {
        if(el.parents.includes(person.id)) {
            return true;
        }
        else{
            return false;
        }
    })
    let personDescendant = returnPeople(children)
    return personDescendant
}

// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

