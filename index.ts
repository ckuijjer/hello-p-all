import * as pAll from 'p-all';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fn = (msg) => async () => {
  console.log(`starting with ${msg}`);
  await sleep(1000);
  console.log(`done with ${msg}`);
  return msg;
};

(async () => {
  const actions = [fn(1), fn(2), fn(3), fn(4)];
  console.log(await pAll.default(actions, { concurrency: 2 }));
})();
