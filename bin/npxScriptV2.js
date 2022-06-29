#!/usr/bin/env node
"use strict";

const isProductionMode = ["production", "p", "prod"].includes(process.argv[2]);
const stageName = process.argv[3] || "";

const story = require("./story");

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const MAX_HEART_COUNT = 5;
const HEART_DELAY = 1;

const displayHearts = async (maxHeartCount = MAX_HEART_COUNT) => {
  let hearts = "";

  for (let i = 0; i < maxHeartCount; i++) {
    hearts += "❤️";

    console.log(hearts);
    await delay(HEART_DELAY);
  }
};

const displayHearts2 = async (maxHeartCount = MAX_HEART_COUNT) => {
  let hearts = "";

  for (let i = 0; i < maxHeartCount; i++) {
    hearts += "❤️";
  }

  for (let i = 0; i < maxHeartCount; i++) {
    console.log(hearts);
    hearts = hearts.substring(0, hearts.length - 2);

    await delay(HEART_DELAY);
  }
};

const runSetup = async () => {
  await displayHearts(3);
  await displayHearts2(3);
  console.log("╔═════════ஓ๑♡๑ஓ════════╗");
  console.log("Welcome to the NFT Item Land Official Metaverse Builder Guide");

  if (isProductionMode) {
    console.log("🔥🔥🔥Running Production Mode Guide🔥🔥🔥");
  }

  if (stageName) {
    console.log(`Stage name: ${stageName}`);
  }

  await displayHearts(2);

  story({
    isProductionMode,
    stageName,
  });

  await displayHearts2(2);

  console.log("╚══════ ❀•°❀°•❀ ══════╝");

  console.log(
    "(੭｡╹▿╹｡)੭ " +
      "\nThe Metaverse Ways are always evolving, " +
      "dream to reality is `npx create-metaverse`." +
      "\n♡〜٩(｡╹▿╹｡)۶〜♡"
  );
};

(async () => {
  await runSetup();
})();
