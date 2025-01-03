import CustomButton from '@/components/atoms/Button';
import { Box, Typography } from '@mui/material';


const EditOrderDelivery = () => {

    return (
        <Box className="">
			{/* Header Section */}
			<Box className="flex flex-col border-b pb-4 mt-5">
				<Box className="flex flex-row justify-between items-center">
					<Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>
						Delivery #1, 
					</Typography>
					<Box className="flex" gap={1}>
					</Box>
				</Box>
			</Box>

            {/* Content Section */}
            <Box>
                
            </Box>
        </Box>
    )
}

export default EditOrderDelivery;