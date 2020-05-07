import List from './List';
import Controllers from '../controllers';

export default class User {
  private readonly id: string;
  private name: string;
  private email: string;

  public constructor(userData: TUser) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public async getLists(): Promise<List[]> {
    try {
      const result = await global.database
        .select('lists')
        .column('id')
        .where()
        .whenEquals('user_id', this.id)
        .execute();

      let lists: List[] = [];
      if (result.rowsCount) {
        for await (let data of result.rows) {
          const list = await Controllers.lists.getById(data.id);
          if (list) lists.push(list);
        }
      }

      return lists;
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async changePassword(password: string): Promise<TDatabaseResult> {
    try {
      return await global.database
        .update('users')
        .fields({ password: password })
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async update(): Promise<TDatabaseResult> {
    try {
      const data = this.toArray();

      delete data.id;

      return await global.database
        .update('users')
        .fields(data as any)
        .where()
        .whenEquals('id', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public toArray(): TUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}
