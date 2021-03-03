import { Context } from '../../context';

import { sendMail, createConfirmationUrl } from '../../utils';

import { CONFIRM_USER_PREFIX, FORGET_PASSWORD_PREFIX } from '../../constants';

import { getRedis } from '@bottable.io/data-access/util-redis';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

const { APP_SECRET } = process.env;
const redis = getRedis();

const UserMutations = {
  async register(
    _parent: unknown,
    { input: { firstName, lastName, email, password } },
    { prisma }: Context
  ) {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    if (process.env.NODE_ENV !== 'development')
      await sendMail(email, await createConfirmationUrl(user.id));

    return {
      token: sign({ userId: user.id }, APP_SECRET, { expiresIn: '7 days' }),
      user,
    };
  },
  async login(
    _parent: unknown,
    { input: { email, password } },
    { prisma, request }: Context
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    request.session.userId = user.id;

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
  async confirm(_parent: unknown, { token }, { prisma, user }: Context) {
    const userId = await redis.get(CONFIRM_USER_PREFIX + token);

    if (!userId) {
      return false;
    }

    await prisma.user.update({
      where: {
        id: Number(user.id),
      },
      data: {
        confirmed: true,
      },
    });

    await redis.del(token);

    return true;
  },
  async changePassword(
    _parent: unknown,
    { password, token },
    { prisma, request }: Context
  ) {
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);

    if (!userId) {
      // bad token or expired token
      return null;
    }

    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: await hash(password, 10),
      },
    });

    await redis.del(FORGET_PASSWORD_PREFIX + token);

    request.session.userId = userId;

    return user;
  },
  async forgotPassword(_parent: unknown, { email }, { prisma }: Context) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // don't want to indicate user DNE
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      60 * 60 * 24
    );

    await sendMail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  },
};

export default UserMutations;
