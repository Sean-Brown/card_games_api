import { EntityRepository, Repository, createConnection } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { User } from '../entity/user';
import { saltRounds } from '../constants';

@EntityRepository()
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
   * @returns {number} id of the new user
   */
  async register(userName: string, password: string) {
    const connection = await createConnection();
    const hashedPassword = await hash(password, saltRounds);
    const newUser = await connection.manager.save({
      userName,
      passwordHash: hashedPassword,
    } as User);
    return newUser.id;
  }

  /**
   * Verify the password for the given user
   * @param userName
   * @param password
   * @returns {boolean} true if the password matches
   */
  async verify(userName: string, password: string) {
    const user = await this.findByName(userName);
    return await compare(password, user.passwordHash);
  }
}
