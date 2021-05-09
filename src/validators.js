const fs = require('fs');
const { resolve } = require('path');

function isInteger(value) {
  return Number.isInteger(parseInt(value));
}

function validateShift(value) {
  if (!isInteger(value)) {
    process.stderr.write('Error: Shift should be an integer!');
    process.exit(1);
  }
  return parseInt(value);
}

function validateAction(action) {
  if (
    action.toString().toLowerCase() !== 'encode' &&
    action.toString().toLowerCase() !== 'decode'
  ) {
    process.stderr.write(`Error: Action should be 'encode' or 'decode'!`);
    process.exit(1);
  }

  return action;
}

function validateInputFile(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch (err) {
    process.stderr.write('Error: Input file not accessible!');
    process.exit(1);
  }

  return fs.createReadStream(path);
}

function validateOutputFile(path) {
  try {
    fs.accessSync(path, fs.constants.W_OK);
  } catch (err) {
    process.stderr.write('Error: Output file not accessible!');
    process.exit(1);
  }

  return fs.createWriteStream(path, { flags: 'a+' });
}

module.exports = {
  validateAction,
  validateShift,
  validateInputFile,
  validateOutputFile,
};
