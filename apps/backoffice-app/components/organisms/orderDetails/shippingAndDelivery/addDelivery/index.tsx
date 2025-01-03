import CustomButton from '@/components/atoms/Button';
import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getAddDeliveriesColumns } from './columns';


const AddDelivery = () => {

	const { translate } = useTranslate();
	const columns = getAddDeliveriesColumns(translate);

	return (
		<Box className="">
			{/* Header Section */}
			<Box className="flex flex-col border-b pb-4 mt-5">
				<Box className="flex flex-row justify-between items-center">
					<Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>
						{translate("orders.createDelivery")}
					</Typography>
					<Box className="flex" gap={1}>
						<CustomButton type='button' title={translate("common.cancel")} />
						<CustomButton type='submit' className='text-white' title={translate("common.save")} variant='contained' />
					</Box>
				</Box>
			</Box>

			{/* Content Section */}
			<Box className="flex justify-center mt-4">
				<Box className="w-[46.375rem]">
					<Box>
						<Typography>
							{translate("orders.selectProductsForDeliveryInfo")}
						</Typography>

						<Typography className='mt-6 text-[1rem] font-semibold text-commerceBlack'>
							{translate("orders.selectItemsInTheTableToCreateADelivery")}
						</Typography>
					</Box>

					<Box className="mt-5">
						<DataTable
							rows={[]}
							columns={columns}
						/>
					</Box>
				</Box>
			</Box>

		</Box>
	)

}

export default AddDelivery;