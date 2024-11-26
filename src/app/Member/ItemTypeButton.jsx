import Button from '@/components/common/Button/Button';
import Domain from '@/components/icon/Domain/Domain';

const ItemTypeButton = ({ buttonText, action }) => {
  return (
    <Button
      buttonText={buttonText}
      icon={<Domain color="#909090" />}
      iconPosition="left"
      action={action}
      buttonStyle={{
        padding: '24px 16px',
        gap: '8px',
        borderRadius: '8px',
        color: '#909090',
        fontSize: '20px',
        lineHeight: '32px',
        border: '1px solid #909090',
      }}
    />
  );
};

export default ItemTypeButton;
