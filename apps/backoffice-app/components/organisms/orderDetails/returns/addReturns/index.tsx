import AccordianUnControlled from '@/components/atoms/Accordian';
import CustomButton from '@/components/atoms/Button';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { generalformSchema } from './schema';
import { useForm } from 'react-hook-form';
import DataTable from '@/components/atoms/DataTable';
import { getAddOrderReturnColumns } from './columns';
import { useEffect, useState } from 'react';
import { useOrders } from 'context/orders';
import { useLanguage } from 'context/language.context';


const AddOrderReturns = () => {

	const { translate } = useTranslate();
	const { locale } = useLanguage()
	const { orderDetails: { returnInfo, lineItems } } = useOrders();
	const [orderReturnItems, setOrderReturnItems] = useState();
	const { register, handleSubmit, watch, reset, formState: { errors, isValid }, control } = useForm({
		defaultValues: {}
	});

	const generalFormFeilds = generalformSchema(translate)
	const addOrderReturnColumns = getAddOrderReturnColumns()

	useEffect(() => {
		if (!lineItems || !lineItems.length) return;
		const mappedList = lineItems.map((item: any, index: number) => ({
			id: item.id,
			no: index,
			comment: "",
			returnQuantity: 0,
			quantityInPreviousReturn: 0,
			orderedQuantity: item.quantity,
			product: {
				name: item.name[locale],
				sku: item.variant.sku
			}
		}))
		setOrderReturnItems(mappedList)
	}, [locale, lineItems?.length])

	const onSubmitForm = (data: any) => {
		console.log("data====>", data)
	}

	return (
		<Box className="" component="form" onSubmit={handleSubmit(onSubmitForm)}>
			{/* Header Section */}
			<Box className="flex flex-col border-b pb-4 mt-5">
				<Box className="flex flex-row justify-between items-center">
					<Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>
						{translate("orders.newReturnInfo")}
					</Typography>
					<Box className="flex" gap={1}>
						<CustomButton type='button' title={translate("common.cancel")} />
						<CustomButton type='submit' className='text-white' title={translate("common.save")} variant='contained' />
					</Box>
				</Box>
			</Box>

			<Box className="h-[65vh] overflow-y-auto">
				{/* Content */}
				<Box className="flex justify-center mt-4">
					<Box className="w-[46.375rem]">
						<AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"common.generalInformation"}>
							<Box className="flex flex-col gap-2">
								<CustomFieldMapper
									formFields={generalFormFeilds}
									formData={{}}
									register={register}
									errors={errors}
									control={control}
								/>
							</Box>
						</AccordianUnControlled>
					</Box>
				</Box>

				{/* Return Items Content */}
				<Box className="">
					<AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"orders.returnItems"}>
						<Box className="flex flex-col gap-1">
							<Typography className='font-semibold text-[1rem] text-commerceBlack' >
								{translate("orders.selectTheItemsShouldBeGroupedTogetherInSingleReturn")}
							</Typography>
							<Typography className='font-normal text-[0.875rem] text-commerceBlack' >
								{translate("orders.completeReturnBeforeSavingInfo")}
							</Typography>

							<DataTable
								columns={addOrderReturnColumns}
								rows={orderReturnItems}
								hideFooter
								checkboxSelection
								disableRowSelectionOnClick={true}
							/>
						</Box>
					</AccordianUnControlled>
				</Box>

			</Box>
		</Box>
	)
}

export default AddOrderReturns;