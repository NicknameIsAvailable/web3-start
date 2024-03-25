import { NextResponse } from 'next/server';
import { CustomHeaders, prisma } from '@/app/api';
import { hash } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const headersWithAddress = req.headers as CustomHeaders;
    const userWalletAddress = headersWithAddress.get('user-wallet-address');

    const { nickname, password, repeatPassword } = await req.json()

    if (!nickname)
      return NextResponse.json({ success: false, message: 'No nickname given' });

    if (!password)
      return NextResponse.json({ success: false, message: 'No password given' });

    if (!repeatPassword)
      return NextResponse.json({ success: false, message: 'No password given' });

    if (password !== repeatPassword)
      return NextResponse.json({ success: false, message: 'The passwords don\'t match' });

    if (userWalletAddress) {
      const passwordHash = await hash(password)

      console.log(passwordHash)

      const newUser = await prisma.user.create({
        data: {
          nickname,
          password: passwordHash || "",
          address: userWalletAddress
        }
      });
      return NextResponse.json({ message: 'User created', newUser });
    } else {
      return NextResponse.json({ message: 'User wallet address not provided' });
    }
  } catch (e) {
    return NextResponse.json({ message: 'Error:', e });
  }
}