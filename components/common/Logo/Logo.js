import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push('/');
      }}
      style={{
        cursor: 'pointer',
        display: 'flex',
        gap: '12px',
      }}
    >
      <Image
        src="/housing/icon/ellipse.svg"
        alt="ellipse"
        width={30}
        height={30}
      />
      <Image src="/housing/icon/icon.svg" alt="icon" width={72} height={20} />
    </div>
  );
}
