export default class User {
  private readonly id: string;
  private name: string;
  private email: string;

  public constructor(userData: TUser) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
  }

  public getID(): string {
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

  public async changePassword(password: string): Promise<void> {
    try {
      return await global.database
        .update('users')
        .fields({ password: password })
        .where('id = $2', this.id)
        .execute();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public async update(): Promise<any> {
    try {
      return await global.database
        .update('users')
        .fields({
          name: this.name,
          email: this.email
        })
        .where('id = $3', this.id)
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
