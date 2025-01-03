import CategoryBranch from './general-CategoryBranch';
import GeneralInfomation from './general-GeneralInfomation';
import { Box, Typography, IconButton } from '@mui/material';

const CategoryGeneralComponent = () => {
  return (
    <Box className="mx-10">
      <GeneralInfomation />
      <CategoryBranch />;
    </Box>
  );
};

export default CategoryGeneralComponent;
