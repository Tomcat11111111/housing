import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import Image from 'next/image';

import FieldGroup from './FieldGroup';

const ItemAdvancedInformation = () => {
  const [itemFiles, setItemFiles] = useState([]);
  const [registerFiles, setRegisterFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelectedOption(e.target.name);
  };

  const handleItemFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    setItemFiles((prevFiles) => [...prevFiles, ...Array.from(uploadedFiles)]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setItemFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    accept: 'image/*',
    multiple: true,
  });

  const handleRegisterFileUpload = () => {};

  const RegisterFileRef = useRef(null);
  const ItemFileRef = useRef(null);

  return (
    <div className="flex flex-col gap-6 my-6">
      {/* 先寫死，還不確定怎麼把前面資料帶進來 */}
      <div className="text-[#333] text-xl font-bold leading-8 ">
        出租&gt;住宅&gt;整層住家&gt;公寓&gt;北投區三合街一段
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

        {/* 此區的兩個方格是否支援點擊上傳 */}
        <div className=" w-full h-[200px] ">
          <div className="h-full relative flex gap-4" {...getRootProps()}>
            {/* 拖拉或點擊上傳後，圖片預覽的放式? */}
            {/* 取代原本方格? */}
            {itemFiles.length > 0 ? (
              <div className="relative w-[300px] h-[200px] overflow-hidden">
                <Image
                  src={URL.createObjectURL(itemFiles[0])}
                  alt="first-image"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className="flex border-2 border-dashed border-[#909090]  rounded-[4px] w-[300px] h-full justify-center items-center cursor-pointer"
                onClick={() => ItemFileRef.current.click()}
              >
                <p>新增首圖</p>
              </div>
            )}
            <div
              className="flex border-2 border-dashed border-[#909090]  rounded-[4px] w-[300px] h-full justify-center items-center cursor-pointer"
              onClick={() => ItemFileRef.current.click()}
            >
              <p>新增圖片</p>
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
              className="h-[56px] w-[120px] bg-[#0936D8] text-sm absolute bottom-0 right-0"
              color="primary"
              variant="contained"
              onClick={() => ItemFileRef.current.click()}
            >
              批量上傳
            </Button>
            {/* Preview the uploaded files */}
            {itemFiles.length > 0 && (
              <div className="mt-4">
                <h4>已上傳的檔案:</h4>
                <div className="flex gap-4">
                  {itemFiles.map((file, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <p className="text-xs text-gray-500">{file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </FieldGroup>
      <FieldGroup title="屋況介紹">
        <TextField
          id="description"
          multiline
          rows={6}
          placeholder="可以描述物件特色或現況"
          value={description}
          onChange={handleDescriptionChange}
        />
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
            color="primary"
            variant="contained"
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
              sx={{ width: '324px' }}
              slotProps={{
                input: {
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        行動電話＊
                      </InputAdornment>
                      <InputAdornment position="start">+886</InputAdornment>
                    </>
                  ),
                },
              }}
            />
            <TextField
              id="contacts"
              placeholder="請輸入固定電話"
              sx={{ width: '288px' }}
              slotProps={{
                input: {
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        固定電話＊
                      </InputAdornment>
                      <InputAdornment position="start">02</InputAdornment>
                    </>
                  ),
                },
              }}
            />
          </div>
          <TextField
            id="contacts"
            placeholder="請輸入電子信箱"
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

export default ItemAdvancedInformation;
