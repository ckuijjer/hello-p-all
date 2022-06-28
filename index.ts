import * as pAll from 'p-all';
import * as pMap from 'p-map';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fn = async (msg: number): Promise<number> => {
  console.log(`starting with ${msg}`);
  await sleep(1000);
  console.log(`done with ${msg}`);
  return msg;
};

const usingPromiseAll = () => {
  const promises = [fn(1), fn(2), fn(3), fn(4)];
  return Promise.all(promises);
};

const usingPAll = () => {
  const actions = [() => fn(1), () => fn(2), () => fn(3), () => fn(4)];
  return pAll.default(actions, { concurrency: 2 });
};

const usingPMap = () => {
  const inputs = [1, 2, 3, 4];

  return pMap.default(inputs, (input) => fn(input), { concurrency: 2 });
};

const usingForAwait = async () => {
  const inputs = [1, 2, 3, 4];
  const result = [];

  for await (const input of inputs) {
    result.push(await fn(input));
  }

  return result;
};

(async () => {
  const result = await usingPromiseAll();
  // const result = await usingPAll();
  // const result = await usingPMap();
  // const result = await usingForAwait();

  console.log({ result });
})();
