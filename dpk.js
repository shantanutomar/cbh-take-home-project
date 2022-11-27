const crypto = require("crypto");

/* Refactored code */

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.determinePartitionKey = event => {

  const generatedHash = crypto.createHash("sha3-512");
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey;
    } else {
      const eventData = JSON.stringify(event);
      candidate = generatedHash.update(eventData).digest("hex");
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generatedHash.update(candidate).digest("hex");
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

/* Original code */

/*
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};*/
