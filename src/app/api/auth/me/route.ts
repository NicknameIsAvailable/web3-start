import { CustomHeaders, prisma } from '@/app/api';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const headersWithAddress = req.headers as CustomHeaders;
    const userWalletAddress = headersWithAddress.get('user-wallet-address');

    if (userWalletAddress) {
      const user = await prisma.user.findUnique({
        where: {
          address: userWalletAddress
        },
        select: {
          nickname: true,
          address: true
        }
      });

      return NextResponse.json({ success: true, message: 'Data received', user });
    } else {
      return NextResponse.json({ success: false, message: 'User wallet address not provided' });
    }
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Error:', e });
  }
}

export async function PATCH(req: Request) {

  try {
    const headersWithAddress = req.headers as CustomHeaders;
    const userWalletAddress = headersWithAddress.get('user-wallet-address');

    const body = await req.json()
    const { nickname } = body

    if (nickname.length < 3) {
      return NextResponse.json({ success: false, message: 'Minimum nickname length - 3 characters' });
    }

    if (nickname.length > 80) {
      return NextResponse.json({ success: false, message: 'Maximum nickname length - 80 characters' });
    }

    if (userWalletAddress) {
      const user = await prisma.user.update({
        where: {
          address: userWalletAddress
        },
        data: {
          nickname
        }
      })

      return NextResponse.json({ success: true, message: 'Data updated', user });
    } else {
      return NextResponse.json({ success: false, message: 'User wallet address not provided' });
    }
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Error:', e });
  }
}