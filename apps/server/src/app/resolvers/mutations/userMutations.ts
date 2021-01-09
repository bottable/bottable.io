import { Context } from '../../context';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const { APP_SECRET } = process.env;

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

    console.log(user, hashedPassword);

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
  async login(
    _parent: unknown,
    { input: { email, password } },
    { prisma }: Context
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

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
};

export default UserMutations;
