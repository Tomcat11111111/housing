'use client';
import Header from '@components/layout/Header/Header';

export default function Anout() {
  return (
    <div>
      <Header />
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'darkblue',
        }}
      >
        <h1>關於我頁面，什麼時候會生出來呢？</h1>
      </div>
    </div>
  );
}
