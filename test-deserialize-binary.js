var assert = require("assert");
var flatbuffers = require("./flatbuffers").flatbuffers;
var { Dictionary, Word } = require("./dictionary_generated.js");
console.log(Dictionary, Word);

var fs = require("fs");

function main() {
  console.time("total");

  console.time("deserialize");
  var data = new Uint8Array(fs.readFileSync("./dictionary.bin"));
  var buf = new flatbuffers.ByteBuffer(data);

  var dict = Dictionary.getRootAsDictionary(buf);
  console.timeEnd("deserialize");

  console.time("readValue");

  console.log("dict.entriesLength", dict.entriesLength());
  var keyvalue = dict.entries(0);
  var word = keyvalue.value();
  console.log(
    "word",
    keyvalue.key(),
    word.ipa(),
    word.translationLength(),
    word.translation(0),
    word.translation(1)
  );

  console.timeEnd("readValue");
  console.timeEnd("total");
  console.log("The FlatBuffer was successfully created and verified!");
}

main();
