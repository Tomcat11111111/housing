import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { QRCodeCanvas } from 'qrcode.react';

import Button from '@/common/Button/Button';

import Input from '@/components/common/Input/Input';
import Tag from '@/components/common/Tag/Tag';
import Account from '@/components/icon/Account/Account';
import Fire from '@/components/icon/Fire/Fire';
import Mail from '@/components/icon/Mail/Mail';
import Person from '@/components/icon/Person/Person';
import Phone from '@/components/icon/Phone/Phone';
import PhoneInTalk from '@/components/icon/PhoneInTalk/PhoneInTalk';

import { getPriceStatusInfo } from '@/utils/tools';

import styles from './DetailSideBar.module.scss';

const DetailSideBar = (props) => {
  const { price, views } = props;

  const [contactSwitch, setContactSwitch] = useState('book');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const reserveApi = async ({ name, phone, email }) => {
    const response = await axios.post(
      `https://jzj-api.zeabur.app/properties/${selectedTab === 'rent' ? 'for-rent' : 'for-sale'}/${propertyId}/reserve`,
      {
        name,
        phone,
        email,
      }
    );

    return response.data;
  };

  const { mutate: reserveMutation } = useMutation({
    mutationFn: reserveApi,
    onSuccess: () => {},
  });

  const priceStatusInfo = getPriceStatusInfo(25000, 15000);

  return (
    <div className={styles.detailSideBar}>
      {price && (
        <div className={styles.price}>
          {price && <span>{price.toLocaleString()}/月</span>}
          <Tag
            text={priceStatusInfo?.text}
            textStyle={{
              color: '#F6F6F6',
            }}
            tagColor={priceStatusInfo?.color}
            iconPosition="right"
            icon={priceStatusInfo?.icon}
            padding="8px 16px"
            gap="4px"
          />
        </div>
      )}
      <div className={styles.contact}>
        <div className={styles.switchContainer}>
          <div
            className={styles.switch}
            onClick={() => {
              setContactSwitch('book');
            }}
            data-selected={contactSwitch === 'book' ? 'selected' : ''}
          >
            預約看房
          </div>
          <div
            className={styles.switch}
            onClick={() => {
              setContactSwitch('phone');
            }}
            data-selected={contactSwitch === 'phone' ? 'selected' : ''}
          >
            立即回電
          </div>
        </div>
        {contactSwitch === 'book' && (
          <div className={styles.book}>
            <div className={styles.inputContainer}>
              <div className={styles.genderButton}>
                <Button
                  buttonText="先生"
                  buttonStyle={{
                    padding: '8px 16px',
                    background: gender === 'male' ? '#0936D8' : '',
                  }}
                  textStyle={{
                    color: gender === 'male' ? '#FFF' : '#CCC',
                  }}
                  action={() => setGender('male')}
                />
                <Button
                  buttonText="小姐"
                  buttonStyle={{
                    padding: '8px 16px',
                    background: gender === 'female' ? '#0936D8' : '',
                  }}
                  textStyle={{
                    color: gender === 'female' ? '#FFF' : '#CCC',
                  }}
                  action={() => setGender('female')}
                />
              </div>
              <Input
                placeholder="如何稱呼"
                icon={<Person />}
                iconPosition="left"
                inputWidth="120px"
                input={name}
                onChange={(value) => setName(value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                placeholder="聯絡電話"
                icon={<Phone />}
                iconPosition="left"
                input={phone}
                onChange={(value) => setPhone(value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                placeholder="聯絡信箱"
                icon={<Mail />}
                iconPosition="left"
                input={email}
                onChange={(value) => setEmail(value)}
              />
            </div>
            <p className={styles.reminder}>
              當您送出預約資訊即代表您同意<a>拓樸相關條例</a>
              ，並允許賣家與您聯繫
            </p>
          </div>
        )}
        {contactSwitch === 'phone' && (
          <div className={styles.phone}>
            <div className={styles.phoneInfo}>
              <Account size={40} />
              <span>金小姐</span>
            </div>
            {contactSwitch === 'phone' && (
              <div className={styles.qrcode}>
                <QRCodeCanvas
                  value={'tel:0936698468'}
                  size={160} // Size of the QR code
                  bgColor={'#ffffff'} // Background color
                  fgColor={'#000000'} // Foreground color (QR code color)
                  level={'L'} // Error correction level ('L', 'M', 'Q', 'H')
                  includeMargin={false} // Add margin or not
                />
              </div>
            )}
          </div>
        )}
        <Button
          buttonText={contactSwitch === 'phone' ? '0936-698-468' : '立即預約'}
          buttonStyle={{
            borderRadius: '8px',
            background: '#0936D8',
            padding: contactSwitch === 'book' ? '16px 128px' : '16px 82px',
            gap: '8px',
          }}
          textStyle={{
            color: '#FFF',
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '24px',
          }}
          iconPosition={contactSwitch === 'phone' ? 'left' : ''}
          icon={<PhoneInTalk />}
          action={() => {
            if (contactSwitch !== 'phone') {
              reserveMutation({ name, phone, email });
            }
          }}
        />
      </div>
      <div className={styles.view}>
        <Fire />
        <span>此物件十分搶手</span>
        {views}人瀏覽
      </div>
    </div>
  );
};

export default DetailSideBar;
