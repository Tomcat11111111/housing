import Image from 'next/image';

// export function throttle(callback, delay) {
//   let timerID = null;
//   const throttledFunction = function (...args) {
//     if (timerID) return;

//     timerID = setTimeout(() => {
//       callback.apply(this, args);
//       timerID = null;
//     }, delay);
//   };

//   return throttledFunction;
// }

const PRICE_STATUS_MAP = new Map([
  [
    'above',
    {
      text: '略高於平均',
      color: '#E85454',
      icon: (
        <Image
          src="/housing/icon/trending_up.svg"
          alt="trending_up"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'below',
    {
      text: '略低於平均',
      color: '#52C32A',
      icon: (
        <Image
          src="/housing/icon/trending_down.svg"
          alt="trending_down"
          width={20}
          height={20}
        />
      ),
    },
  ],
  [
    'equal',
    {
      text: '等於平均',
      color: '#FAAF1D',
      icon: (
        <Image
          src="/housing/icon/trending_flat.svg"
          alt="trending_flat"
          width={20}
          height={20}
        />
      ),
    },
  ],
]);

export const getPriceStatusInfo = (price, average = 0) => {
  if (price > average) return PRICE_STATUS_MAP.get('above');
  if (price < average) return PRICE_STATUS_MAP.get('below');
  if (price === average) return PRICE_STATUS_MAP.get('equal');
};
