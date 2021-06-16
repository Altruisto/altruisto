/**
 * Function which returns the appropriate translation depending on the number from `referralsCount`. 
 * It is necessary to translate the "people" into e.g. Polish, where the word "people" declines differently 
 * depending on whether number of people is:
 * 1) (case nr 1) between 5-21 (inclusive 5 and 21) and if number ends with digit:
 *  - 0 or 1 
 *  - between 5-9 (inclusive)
 *  - between 11-19 (inclusive)
 * 2) (case nr 2) number 2, 3 or 4 and if number end with digit 2, 3 or 4
 */ 

export const getNumberOfPeople = (
    numberOfPeople: number, 
    personTranslation: string,
    declinationPeopleTranslation: string,
    anotherDeclinationPeopleTranslation: string
) => {
  const number10 = numberOfPeople % 10
  const number100 = numberOfPeople % 100
  if (numberOfPeople === 1) {
    return personTranslation
  } else if (number10 > 4 || number10 < 2 || (number100 < 15 && number10 > 11)) {
    return declinationPeopleTranslation

  }
  return anotherDeclinationPeopleTranslation
}
