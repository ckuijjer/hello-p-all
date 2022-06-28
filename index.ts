import * as pAll from 'p-all';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fn = (msg: any) => async () => {
  console.log(`starting with ${msg}`);
  await sleep(1000);
  console.log(`done with ${msg}`);
  return msg;
};

(async () => {
  const actions = [fn(1), fn(2), fn(3), fn(4)];
  // @ts-ignore-next-line
  console.log(await pAll.default(actions, { concurrency: 2 }));
})();
