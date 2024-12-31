import Logo from '@/components/common/Logo/Logo';

import usePublishStore from '@/store/usePublishStore';

import Account from '@/icon/Account/Account';

import styles from './PublishHeader.module.scss';

const PublishHeader = () => {
  const { editPropertyState, setEditPropertyState } = usePublishStore();
  const { isEdit, step } = editPropertyState;

  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.iconArea}>
            <Logo size="big" />
            <span className={styles.stroke}>|</span>
            <p>{isEdit ? '編輯物件' : '會員中心'}</p>
          </div>
          {isEdit && (
            <div className="flex items-center gap-8 text-gray-300 leading-5">
              <button
                className={`py-[21px] ${
                  step === 0
                    ? 'text-blue-600 font-bold border-b-3 border-blue-600'
                    : ''
                }`}
                onClick={() => {
                  setEditPropertyState({ step: 0 });
                }}
              >
                物件類型
              </button>
              |
              <button
                className={`py-[21px] ${
                  step === 1
                    ? 'text-blue-600 font-bold border-b-3 border-blue-600'
                    : ''
                }`}
                onClick={() => {
                  setEditPropertyState({ step: 1 });
                }}
              >
                物件資訊
              </button>
              |
              <button
                className={`py-[21px] ${
                  step === 2
                    ? 'text-blue-600 font-bold border-b-3 border-blue-600'
                    : ''
                }`}
                onClick={() => {
                  setEditPropertyState({ step: 2 });
                }}
              >
                進階資訊
              </button>
            </div>
          )}

          <div className={styles.memberArea}>
            <p>某某某</p>
            <Account color="#0936D8" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublishHeader;
