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

export const getByName = async (name: string) => {
  try {
    const result = await global.database
      .select('users')
      .columns(['id', 'name', 'email'])
      .where('name = $1', name)
      .execute();

    const data = {
      quantity: result.rowCount,
      users: result.rows
    };
    
    return data;
  } catch (error) {
    console.error('** DATABASE ->', error instanceof Error ? error.message : error);
    return Promise.reject(error instanceof Error ? error : new Error(error))
  }
};

export const getByEmail = async (email: string) => {
  try {
    const result = await global.database
      .select('users')
      .columns(['id', 'name', 'email'])
      .where('email = $1', email)
      .execute();

    const data = {
      quantity: result.rowCount,
      users: result.rows
    };
    
    return data;
  } catch (error) {
    console.error('** DATABASE ->', error instanceof Error ? error.message : error);
    return Promise.reject(error instanceof Error ? error : new Error(error))
  }
};

export const create = async (name: string, email: string, password: string) : Promise<any> => {
  try {
    if (!name || !email || !password)
      throw 'The data is required'

    let user = await getByName(name)
    if (user.quantity)
      throw 'The user name already exists'

    user = await getByEmail(email)
    if (user.quantity)
      throw 'The user email already exists'

    const result = await global.database
      .insert('users')
      .fields({
        name,
        email,
        password
      })
      .execute();
    
    return result.rows[0];
  } catch (error) {
    console.error('** DATABASE ->', error instanceof Error ? error.message : error);
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
};

export const update = () => {
  // TODO:
};

export const destroy = () => {
  // TODO:
};
