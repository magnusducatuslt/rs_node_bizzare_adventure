const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function isAlpha(string) {
  return /[a-z]/i.test(string);
}

function isString(input) {
  return typeof input === 'string';
}

function isUpper(char) {
  return char === char.toUpperCase();
}

function shiftAlphabet(shift) {
  return alphabet.reduce((map, char, index, array) => {
    const maxIndex = alphabet.length - 1;
    const totalIndex = index + (shift % alphabet.length);

    const effectiveIndex =
      totalIndex > maxIndex ? totalIndex - maxIndex - 1 : totalIndex;

    map[char] = array[effectiveIndex];

    return map;
  }, {});
}

function encode(input, shift) {
  if (!isString(input)) {
    return '';
  }

  const shiftedCharacters = shiftAlphabet(shift);

  const encryptedString = input.split('').reduce((result, char) => {
    const encryptedCharacter = isAlpha(char)
      ? shiftedCharacters[char.toLowerCase()]
      : char;
    return (
      result +
      (isUpper(char) ? encryptedCharacter.toUpperCase() : encryptedCharacter)
    );
  }, '');

  return encryptedString;
}

function decode(input, shift) {
  const alphaLen = alphabet.length;

  return encode(input, (alphaLen - shift) % alphaLen);
}

module.exports = { encode, decode };
