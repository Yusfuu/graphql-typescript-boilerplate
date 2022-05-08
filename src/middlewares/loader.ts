import DataLoader from 'dataloader';

/* example of a dataloader for mongodb */

// create a dataloader for the given model
export const createLoader = (Model: any) => {
  const loader = new DataLoader(async (keys) => {
    const data = await Model.find({ _id: { $in: keys } });
    return keys.map((key) => data.filter(({ id }: any) => id === key));
  });

  return {
    load: async (id: string) => loader.load(id),
    loadMany: async (ids: string[]) => loader.loadMany(ids),
    clear: (id: string) => loader.clear(id),
    clearAll: () => loader.clearAll(),
  };
};
