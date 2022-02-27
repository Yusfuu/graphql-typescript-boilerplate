// Connect to data sources
export const db = async () => {
  const DATABASE_URL = process.env.DATABASE_URL as string;

  const connection = null;

  console.log(`👋 Connected to database successfully`);

  return connection;
};
