import DataLoader from 'dataloader';

/* example of a dataloader for mongodb */
// create a dataloader for the given model (mongobd)
export const createLoader = (Model: any) => {
  return new DataLoader(async (keys) => {
    const data = await Model.find({ _id: { $in: keys } });
    return keys.map((key) => data.filter(({ id }: any) => id === key));
  });
};

// example of a dataloader for any other type of data
// this is the same as the above but with a different syntax

// export const createDataLoader = (callback: any) => {
//   return new DataLoader((keys) =>
//     callback(keys).then((data: any) =>
//       keys.map((key) => data.filter((item: any) => item.id === key))
//     )
//   );
// };
// createDataLoader((keys) => Promise.resolve(keys)).loadMany([]);
