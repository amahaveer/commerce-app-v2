import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IImageList, ImageDraggableComponentProps } from './type';
import useTranslate from 'hooks/useTranslate';

// Define the initial images array
const initialImages = [
  { url: 'https://via.placeholder.com/120', label: 'Image 1' },
  { url: 'https://via.placeholder.com/120', label: 'Image 2' },
];

const ImageDraggableComponent = (props: ImageDraggableComponentProps) => {
 
  const { draggable, imageList, onDeleteImage, setImageList } = props;
  const { translate } = useTranslate()
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Handle the drag start event
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  // Handle the drag over event
  const handleDragOver = (index: number, event: React.DragEvent) => {
    event.preventDefault();
  };

  // Handle the drop event to reorder the items
  const handleDrop = (index: number) => {
    if (draggingIndex === null) return;

    const newItems = [...imageList];
    const draggedItem = newItems.splice(draggingIndex, 1)[0]; // Remove the dragged item
    newItems.splice(index, 0, draggedItem); // Insert the dragged item at the new index

    setImageList(newItems);
    setDraggingIndex(null);
  };

  return (
    <Box className={`flex flex-${draggable ? 'col' : 'row'} items-center justify-center mt-10`} gap={2}>
      {imageList.map((item, index) => (
        <Box
          key={index}
          className="flex border border-gray-300 w-[540px] h-[168px] p-4 items-center cursor-pointer"
          draggable={draggable}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(event) => handleDragOver(index, event)}
          onDrop={() => handleDrop(index)}
        >
          {/* Left: Image with border */}
          <Box className="border border-gray-300 w-[120px] h-[120px]">
            <img
              src={item.url}
              alt={item.label}
              className="object-cover w-full h-full"
            />
          </Box>

          {/* Right: Label, Input Field, Delete Icon */}
          <Box className="flex flex-col flex-1 ml-4 justify-between">
            <Box>
              <Typography className="text-commerceBlack text-[0.875rem] font-medium">
                {translate("product.imageLabel")}
              </Typography>

              <TextField
                size="small"
                variant="outlined"
                placeholder="Type something..."
                fullWidth
                className="mt-2"
              />
            </Box>

            {/* Delete Icon at bottom right */}
            <Box className="flex justify-end mt-4">
              <IconButton onClick={() => onDeleteImage(index)} color="error" aria-label="delete">
                <DeleteIcon className='w-4 h-4'/>
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ImageDraggableComponent;
