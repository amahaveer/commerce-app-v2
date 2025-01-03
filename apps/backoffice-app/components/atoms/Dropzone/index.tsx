import React, { useState, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../Button';
import useTranslate from 'hooks/useTranslate';
import { IDropzoneProps } from './type';
import PrefixInputBase from '../PrefixInputBase';
import { isValidImageUrl } from 'utils';
import GalleryUploadIcon from '../CustomIcons/galleryUpload';

const CustomDropzone = (props: IDropzoneProps) => {

	const { uploadedImages, setUploadedImages } = props;
	const { translate } = useTranslate()
  const [isDragOver, setIsDragOver] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const [isInvalidUrl, setIsInvalidUrl] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = Array.from(event.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    const imagePromises = files
      .filter((file) => file.type.startsWith('image/')) 
      .map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(imagePromises).then((imagePreviews) => {
      setUploadedImages((prevImages: any) => [...prevImages, ...imagePreviews]);
    });
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages: any) => prevImages.filter((_: any, i: number) => i !== index));
  };

	const handleUrlUpload = () => {
    if (imageUrl && isValidImageUrl(imageUrl)) {
      setUploadedImages((prevImages: any) => [...prevImages, imageUrl]);
      setImageUrl(''); // Clear the input after adding the image
    } else {
      setIsInvalidUrl(true);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

	const onChangeImageUrl = (value: string) =>{
		if (isInvalidUrl) setIsInvalidUrl(false);
		setImageUrl(value);
	}

  return (
    <Box>
      <Box
        className={`flex flex-col border-2 border-dashed rounded-lg w-[75rem] h-auto py-4
                  ${isDragOver ? 'border-blue-500' : 'border-customGray-gainsboro'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Box className="flex space-x-4 p-4">
          
          {/* Render Uploaded Images */}
          <Box className="flex flex-wrap space-x-4">
            {uploadedImages.map((image, index) => (
              <Box
                key={index}
                className="relative border-2 border-gray-400 w-[9.25rem] h-[9.25rem] flex items-center justify-center cursor-pointer transition-all hover:border-blue-500"
              >
                {/* Image Preview */}
                <img
                  src={image}
                  alt={`Uploaded Preview ${index}`}
                  className="object-cover w-full h-full"
                />

                {/* Delete Icon, visible only on hover */}
                <IconButton
                  className="absolute bottom-1 right-1 transition-opacity hover:bg-white rounded-1"
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Inner Box */}
          <Box className="border-2 border-dashed border-customGray-gainsboro w-[9.25rem] h-[9.25rem] flex items-center justify-center">
            <Box className="text-center">
							<GalleryUploadIcon className='w-[3.75rem] h-[3.75rem]'  />
              <Typography className="mt-2 text-customGray text-[0.875rem] font-normal">
                {translate("common.dragAndDropImagesHere")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* File Input for manual image selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
      </Box>

      {/* Button that triggers the file upload */}
      <Box className="flex flex-col mt-2 w-40" gap={1}>
        <Typography className='text-commerceBlack font-medium text-[0.875rem]' >Browse your device</Typography>
        <CustomButton title="Choose File" onClick={handleBrowseClick} />
      </Box>

			<Box className="flex flex-col mt-4" gap={1}>
				<Typography className='text-commerceBlack font-medium text-[0.875rem]'>{translate("common.browseYourDevice")}</Typography>
				<PrefixInputBase
					wrapperClass='w-[49rem]' 
					prefix={null} 
					placeholder={translate("common.enterAnImageUrl")}
					onChange={onChangeImageUrl}
					error={isInvalidUrl}
					errorMessage={translate("common.pleaseEnterValidImageURL")}
				/>
				<CustomButton.InsertLink 
					className='w-[8.48rem]' 
					title={translate("common.addImage")} 
					onClick={handleUrlUpload}
				/>
			</Box>
    </Box>
  );
};

export default CustomDropzone;
