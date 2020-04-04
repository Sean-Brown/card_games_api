import { EntityRepository, Repository, createConnection } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { User } from '../entity/user';
import { saltRounds } from '../constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Find a user by username
   * @param {string} userName
   * @returns {Promise<User>} the user model, if it exists in the database
   */
  findByName(userName: string): Promise<User> {
    return this.findOne({ where: { userName } });
  }

  /**
   * Register the given user
   * @param userName
   * @param password
   * @returns {User} the new user entity
   */
  async register(userName: string, password: string): Promise<User> {
    const hashedPassword = await hash(password, saltRounds);
    const newUser = await this.save({
      userName,
      passwordHash: hashedPassword,
    } as User);
    return newUser;
  }

  /**
   * Verify the password for the given user
   * @param userName
   * @param password
   * @returns {User} the verified user
   * @throws {Error} throws and exception if the username
   * and password do not match
   */
  async verify(userName: string, password: string) {
    const user = await this.findByName(userName);
    if (!(await compare(password, user.passwordHash))) {
      throw new Error('username and password do not match');
    }
    return user;
  }
}
