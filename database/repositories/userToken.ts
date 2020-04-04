import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

import { UserToken } from '../entity/userToken';
import { User } from '../entity/user';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  /**
   * Register the given user and return their token. If the user
   * already exists, then return their existing token.
   * @param {User} user
   * @returns {Promise<string>} a promise resolving to the user's
   * token
   */
  async register(user: User): Promise<string> {
    const userToken = await this.findOne({
      where: {
        user,
      },
    });
    if (userToken) {
      return userToken.token;
    }
    const token = uuid4();
    await this.save({
      user,
      token,
    });
    return token;
  }

  /**
   * Clear all tokens associated with the given user
   * @param {User} user
   */
  async unregister(user: User) {
    await this.delete({
      user,
    });
  }

  /**
   * Validate that the given user and token combo
   * exists in the database.
   * @param {User} user
   * @param {string} token
   */
  async validate(user: User, token: string): Promise<boolean> {
    const userToken = await this.findOne({
      where: {
        user,
        token,
      },
    });
    return !!userToken;
  }
}
