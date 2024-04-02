import * as StellarSdk from "@stellar/stellar-sdk";

var onmessage = function (e: MessageEvent) {
  var suffix = e.data;

  console.log("Generation started at " + new Date());

  var pair = StellarSdk.Keypair.random();
  var st = new Date().getTime();
  while (true) {
    if (pair.publicKey().endsWith(("" + suffix).toUpperCase())) {
      break;
    }
    pair = StellarSdk.Keypair.random();
  }
  var end = new Date().getTime();

  console.log("Generation completed after " + (end - st) + "ms");

  postMessage([pair.secret(), pair.publicKey(), end - st]);
};
