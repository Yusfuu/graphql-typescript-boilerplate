import DataLoader from 'dataloader';

// create a dataloader for the given model
export const createLoader = (Model: any) => {
  const loader = new DataLoader(async (keys) => {
    const data = await Model.find({ _id: { $in: keys } });
    return keys.map((key) => data.filter(({ id }: any) => id === key));
  });

  return {
    load: async (id: any) => loader.load(id),
  };
};
