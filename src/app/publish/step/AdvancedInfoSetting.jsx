import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { uploadImageApi } from '../actions';
import FieldGroup from './FieldGroup';
import SortableImage from './SortableImage';

const AdvancedInfoSetting = (props) => {
  const {
    advancedInfoSettings,
    setAdvancedInfoSettings,
    itemTypeSettings,
    infoSettings,
  } = props;
  const [registerFiles, setRegisterFiles] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const MAX_CHAR = 2000;

  const handleIntroductionChange = (e) => {
    const inputText = e.target.value;
    if (inputText > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setAdvancedInfoSettings((prev) => ({
        ...prev,
        introduction: truncatedText,
      }));
    } else {
      setAdvancedInfoSettings((prev) => ({
        ...prev,
        introduction: inputText,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setSelectedOption(e.target.name);
  };

  const handleRegisterFileUpload = () => {};

  const RegisterFileRef = useRef(null);
  const ItemFileRef = useRef(null);

  const { mutate: uploadMutation } = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      console.log('Response data:', data);
      setAdvancedInfoSettings((prev) => ({
        ...prev,
        images: [...prev.images, ...data],
      }));
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    },
  });

  const handleItemFileUpload = (e) => {
    const uploadFiles = Array.from(e.target.files);
    uploadMutation(uploadFiles);
    // setAdvancedInfoSettings((prev) => ({
    //   ...prev,
    //   images: [...prev.images, ...uploadFiles],
    // }));
  };

  // 拖拉排序
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // 確保只有在 active.id 和 over.id 不相等時才更新
    if (active.id !== over.id) {
      setAdvancedInfoSettings((prev) => {
        // 找到陣列中 active 和 over 兩個圖片的索引
        const oldIndex = prev.images.findIndex(
          (_, idx) => idx === parseInt(active.id)
        );
        const newIndex = prev.images.findIndex(
          (_, idx) => idx === parseInt(over.id)
        );

        // 如果索引找到，則進行交換
        if (oldIndex !== -1 && newIndex !== -1) {
          const updatedImages = arrayMove(prev.images, oldIndex, newIndex);

          return {
            ...prev,
            images: updatedImages, // 更新 images 陣列
          };
        }

        return prev; // 如果沒有找到有效索引，則不更新
      });
    }
  };

  // 拖曳上傳
  const { getRootProps, getInputProps } = useDropzone({
    // onDrop: (acceptedFiles) => {
    //   setAdvancedInfoSettings((prev) => ({
    //     ...prev,
    //     images: (prev) => [...prev, ...acceptedFiles],
    //   }));
    // },
    onDrop: (acceptedFiles) => {
      uploadMutation({ acceptedFiles });
    },
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-6 my-6">
      <div className="text-[#333] text-xl font-bold leading-8 ">
        {itemTypeSettings.publishType}&gt;{itemTypeSettings.itemType}&gt;
        {itemTypeSettings.category}&gt;{infoSettings.shapeId}&gt;
        {infoSettings.title}
      </div>
      <FieldGroup title="物件照片">
        <div className=" text-[#909090] ">
          <ul>
            <li>．圖片比例為6:4，非此比例會進行裁切</li>
            <li>．支援jpg、png、gif</li>
            <li>．圖片大小25M內</li>
            <li>．請至少上傳5張照片</li>
          </ul>
        </div>

        <div className="w-full">
          <div className="relative" {...getRootProps()}>
            <div className=" grid grid-cols-3 w-8/12 gap-4">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={advancedInfoSettings.images.map((_, index) =>
                    index.toString()
                  )}
                >
                  {advancedInfoSettings.images.map((file, index) => (
                    <SortableImage
                      key={index}
                      id={index.toString()}
                      src={file}
                      name={file.name}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <div
                className="flex border-2 border-dashed border-[#909090]  rounded-[4px] w-[300px] h-[200px] justify-center items-center cursor-pointer"
                onClick={() => ItemFileRef.current.click()}
              >
                <p>新增圖片</p>
              </div>
            </div>

            <input
              {...getInputProps()}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={ItemFileRef}
              onChange={handleItemFileUpload}
              id="item-file-upload"
            />
            <Button
              variant="contained"
              sx={{
                height: '56px',
                width: '120px',
                bgcolor: '#0936D8',
                fontSize: '14px',
                lineHeight: '20px',
                position: 'absolute',
                bottom: '0px',
                right: '0px',
              }}
              onClick={() => ItemFileRef.current.click()}
            >
              圖片上傳
            </Button>
          </div>
        </div>
      </FieldGroup>
      <FieldGroup title="屋況介紹">
        <div className="relative w-full">
          {/* TextField with word count */}
          <TextField
            id="introduction"
            multiline
            rows={6}
            placeholder="可以描述物件特色或現況"
            value={advancedInfoSettings.introduction}
            onChange={handleIntroductionChange}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                paddingBottom: '1.5rem', // Add padding to prevent overlap
              },
            }}
          />

          <div className="absolute bottom-2 right-2 text-[#333333] text-sm font-bold">
            {`${advancedInfoSettings.introduction.length}/${MAX_CHAR}`}
          </div>
        </div>
      </FieldGroup>

      <FieldGroup title="核實信息*">
        <div className="px-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === 'unregistered'}
                onChange={handleCheckboxChange}
                name="unregistered"
              />
            }
            label="未辦理產權登記"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOption === 'registered'}
                onChange={handleCheckboxChange}
                name="registered"
              />
            }
            label="已辦理產權登記"
          />
        </div>
        {/* 這裡的資訊也是寫死 */}
        <p className="text-[#909090]">
          內政部依照【住宅租賃市場發展條例】要求發布廣告內容應與事實相符，請您核實如下資料(
          資料來源{' '}
          <a href="" className=" underline">
            地籍圖資網路便民服務系統
          </a>{' '}
          )
        </p>
        <p>本物件法定用途 : 住家用</p>
        <p>本物件建物面積 : 14.48坪 ( 建物面積坪數不包含公設面積 )</p>
        <p>本物件出租樓層 : 7樓之2 總樓層 : 7樓</p>
        <div className="text-[#909090]">
          <p>若以上資料數據有誤或沒有顯示資料數據</p>
          <p>1. 檢查出租地址欄未填寫是否正確</p>
          <p>2. 或上傳建物權狀影本/線上建物謄本請平台進行核實補充完整資料</p>
        </div>
        <div>
          {/* 此處影本或照片的顯示方式? */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={RegisterFileRef}
            onChange={handleRegisterFileUpload}
            id="register-file-upload"
          />
          <Button
            className="h-[56px] w-[162px] bg-[#0936D8]  text-sm "
            variant="contained"
            sx={{
              height: '56px',
              width: '162px',
              bgcolor: '#0936D8',
              fontSize: '14px',
              lineHeight: '20px',
            }}
            onClick={() => RegisterFileRef.current.click()}
          >
            上傳影本或照片
          </Button>
        </div>
      </FieldGroup>

      {/* 寫死，之後直接帶入資料 */}
      <FieldGroup title="聯絡人資料">
        <div className=" flex flex-col gap-4">
          <TextField
            id="contacts"
            value={advancedInfoSettings.contact}
            onChange={(e) => {
              const contact = e.target.value;
              setAdvancedInfoSettings((prev) => ({
                ...prev,
                contact: contact,
              }));
            }}
            placeholder="請輸入姓名"
            sx={{ width: '258px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">聯絡人＊</InputAdornment>
                ),
              },
            }}
          />
          <div className="flex gap-4">
            <TextField
              id="contacts"
              placeholder="請輸入行動電話"
              value={advancedInfoSettings.mobilePhone}
              onChange={(e) => {
                const mobilePhone = e.target.value;
                setAdvancedInfoSettings((prev) => ({
                  ...prev,
                  mobilePhone: mobilePhone,
                }));
              }}
              sx={{ width: '324px' }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">行動電話＊</InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id="contacts"
              placeholder="請輸入固定電話"
              value={advancedInfoSettings.phone}
              onChange={(e) => {
                const phone = e.target.value;
                setAdvancedInfoSettings((prev) => ({
                  ...prev,
                  phone: phone,
                }));
              }}
              sx={{ width: '288px' }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">固定電話＊</InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <TextField
            id="contacts"
            placeholder="請輸入電子信箱"
            value={advancedInfoSettings.email}
            onChange={(e) => {
              const email = e.target.value;
              setAdvancedInfoSettings((prev) => ({
                ...prev,
                email: email,
              }));
            }}
            sx={{ width: '240px' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">Email</InputAdornment>
                ),
              },
            }}
          />
        </div>
      </FieldGroup>
    </div>
  );
};

export default AdvancedInfoSetting;
