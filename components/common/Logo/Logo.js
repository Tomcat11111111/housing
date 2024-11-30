'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo({ size = 'big' }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push('/');
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      <Image src="/image/logo.png" alt="icon" width={102} height={45} />
      {/* {size === 'big' ? (
        <Image
          src="/image/logo.png"
          alt="icon"
          width={102}
          height={45}
        />
      ) : (
        <Image
          src="/icon/top_icon_small.svg"
          alt="icon"
          width={147.26}
          height={48}
        />
      )} */}
    </div>
  );
}
