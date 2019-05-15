var assert = require("assert");
var flatbuffers = require("./flatbuffers").flatbuffers;
var { Dictionary, Word } = require("./dictionary_generated.js");
var fs = require("fs");

function main() {
  console.time("total");

  console.time("deserialize");
  // var data = new Uint8Array(fs.readFileSync("./dict.bin")); // big bin
  var data = new Uint8Array(fs.readFileSync("./dictionary.bin")); // small bin
  var buf = new flatbuffers.ByteBuffer(data);

  var dict = Dictionary.getRootAsDictionary(buf);
  console.timeEnd("deserialize");

  console.time("readValue");

  console.log("dict.keysLength", dict.keysLength());
  var word = dict.values(0);
  console.log(
    "word",
    word.ipa(),
    word.translationLength(),
    word.translation(0),
    word.translation(1)
  );

  console.log("dict.valuesLength", dict.valuesLength());
  console.timeEnd("readValue");
  console.timeEnd("total");
  console.log("The FlatBuffer was successfully created and verified!");
}

main();
