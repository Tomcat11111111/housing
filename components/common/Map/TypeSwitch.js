import { useEffect, useRef, useState } from 'react';

import Bus from '@/icon/Bus/Bus';
import Hospital from '@/icon/Hospital/Hospital';
import School from '@/icon/School/School';
import Store from '@/icon/Store/Store';

import styles from './TypeSwitch.module.scss';

const TYPE_LIST = [
  {
    type: 'bus_station',
    displayName: '交通',
    icon: ({ size = 40, color = '#909090' }) => (
      <Bus size={size} color={color} />
    ),
  },
  {
    type: 'school',
    displayName: '教育',
    icon: ({ size = 40, color = '#909090' }) => (
      <School size={size} color={color} />
    ),
  },
  {
    type: 'hospital',
    displayName: '醫療',
    icon: ({ size = 40, color = '#909090' }) => (
      <Hospital size={size} color={color} />
    ),
  },
  {
    type: 'convenience_store',
    displayName: '生活',
    icon: ({ size = 40, color = '#909090' }) => (
      <Store size={size} color={color} />
    ),
  },
];

function TypeSwitch({ places = [], selectedType, setSelectedType }) {
  // const [isHovered, setIsHovered] = useState(false);

  const btnRef = useRef();

  // useEffect(() => {
  //   const handleMouseEnter = () => setIsHovered(true);
  //   const handleMouseLeave = () => setIsHovered(false);

  //   const node = btnRef.current;
  //   if (node) {
  //     node.addEventListener('mouseenter', handleMouseEnter);
  //     node.addEventListener('mouseleave', handleMouseLeave);

  //     return () => {
  //       node.removeEventListener('mouseenter', handleMouseEnter);
  //       node.removeEventListener('mouseleave', handleMouseLeave);
  //     };
  //   }
  // }, [btnRef]);

  return (
    <div className={styles.container}>
      {TYPE_LIST.map((item, index) => {
        const { type, icon, displayName } = item;
        const isSelected = selectedType === type;
        return (
          <div
            key={type}
            className={styles.typeSwitchContainer}
            ref={btnRef}
            style={{
              flex: isSelected ? 1 : 0,
              boxShadow: isSelected
                ? '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'
                : '',
            }}
            onClick={() => {
              setSelectedType(type);
            }}
          >
            <div
              className={styles.typeSwitchBtn}
              style={{
                width: isSelected ? '64px' : '',
                color: isSelected ? '#0936D8' : '',
              }}
            >
              {icon({
                size: 40,
                color: isSelected ? '#0936D8' : '#909090',
              })}
              <span>{displayName}</span>
            </div>
            {isSelected && (
              <ul className={styles.places}>
                {places.map((place) => (
                  <li key={place.place_id}>
                    <div className={styles.icon}>
                      {icon({ size: 20, color: '#333333' })}
                      {place.name}
                    </div>
                    <div>約 {place.distance.toFixed(0)}公尺</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TypeSwitch;
