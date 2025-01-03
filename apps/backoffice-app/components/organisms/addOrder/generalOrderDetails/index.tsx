import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AccordianUnControlled from '@/components/atoms/Accordian';
import { generalformSchema } from './schema';
import CustomFieldMapper from '../../customFieldMapper';
import { useForm } from 'react-hook-form';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useOrders } from 'context/orders';


const GeneralOrderDetails = () => {

	const { translate } = useTranslate();
	const { onToolbarAction} = useOrders()
	const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
		defaultValues: {}
	});

	const generalForm = generalformSchema(translate);

	return (
		<Box className="pt-8 pl-16 w-[70%] pb-10">
			<Box className="flex flex-col gap-2">
				<Typography component="h2" className="text-[1.25rem] text-commerceBlack font-medium">
					{translate("orders.orderDetails")}
				</Typography>
				<Typography className="text-[1rem] text-commerceBlack">
					{translate("orders.selectStoreAndCurrency")}
				</Typography>
				<Box className="flex">
					<WarningAmberOutlinedIcon className="text-orange-500 mr-1 text-[16px] mt-1" />
					<Typography className="text-[1rem] text-commerceBlack">
						{translate("orders.storeCurrencyChangeNotAllowedInfo")}
					</Typography>
				</Box>
			</Box>

			<Box className="flex flex-col ">
				{/* General Information */}
				<AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"common.generalInformation"}>
					<Box className="flex flex-col gap-5 pl-5">
						<CustomFieldMapper
							formFields={generalForm}
							formData={{}}
							register={register}
							errors={errors}
						/>
					</Box>
				</AccordianUnControlled>
			</Box>

			<SaveToolbar
				isVisible={true}
				showNext
				onClickAction={onToolbarAction}
			/>
		</Box>
	)
}

export default GeneralOrderDetails;