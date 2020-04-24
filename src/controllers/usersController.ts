export const getAll = async (): Promise<any> => {
  try {
    const result = await global.database
      .select('users')
      .columns(['id', 'name', 'email'])
      .execute();

    const data = {
      quantity: result.rowCount,
      users: result.rows
    };

    return data;
  } catch (error) {
    console.error('** DATABASE ->', error.message);
    throw new Error(error);
  }
};

export const getById = () => {
  // TODO:
};

export const update = () => {
  // TODO:
};

export const destroy = () => {
  // TODO:
};
