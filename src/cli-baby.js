const fs = require('fs');
const { pipeline, Transform } = require('stream');
const { program } = require('commander');

const { encode, decode } = require('./cipher');
const {
  validateShift,
  validateAction,
  validateInputFile,
  validateOutputFile,
} = require('./validators');

program
  .storeOptionsAsProperties(false)
  .version('0.0.1')
  .description('Caesar Cipher CLI App')
  .requiredOption(
    '-s, --shift <number/integer>',
    'a shift of Caesar Cipher Algo',
    validateShift
  )
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file')
  .requiredOption(
    '-a, --action <encode/decode>',
    'an action encode/decode',
    validateAction
  )
  .parse(process.argv);

const { shift, action, input, output } = program.opts();

const readStream = input ? validateInputFile(input) : null;
const writeStream = output ? validateOutputFile(output) : null;

const transformStream = new Transform({
  transform(chunk, _, done) {
    let data = chunk.toString();

    if (action === 'encode') {
      this.push(encode(data, shift));
    }

    if (action === 'decode') {
      this.push(decode(data, shift));
    }

    done();
  },
});

pipeline(
  readStream || process.stdin,
  transformStream,
  writeStream || process.stdout,
  (err) => {
    if (err) {
      process.stderr.write('Operation failed!', err);
    } else {
      process.stdout.write('Operation done!');
    }
  }
);
