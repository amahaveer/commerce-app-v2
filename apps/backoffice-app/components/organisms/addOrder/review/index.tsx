
import AccordianUnControlled from '@/components/atoms/Accordian';
import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getProductReviewColumns } from './columns';
import AddressPanel from '../../orderDetails/shippingAndBillingAddressPanel';
import { useEffect, useState } from 'react';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useOrders } from 'context/orders';

const ReviewOrder = () => {

	const { translate } = useTranslate();
	const { onToolbarAction } = useOrders()
	const [shippingAddress, setShippingAddress] = useState<any>();

	const productColumns = getProductReviewColumns(translate);

	useEffect(() => {
		setShippingAddress({
			name: "william john", streetName: "123 No, 582 Queens Street", apartment: "1", city: "Orlando",
			region: "Florida", country: "US"
		})
	}, [])

	return (
		<Box className="pl-10 flex flex-col gap-4">
			<Box className="flex flex-col mt-4 pl-2">
				<Typography className="text-[1.25rem] font-medium text-commerceBlack">
					{translate("common.review")}
				</Typography>
				<Typography className="text-[1rem] font-normal text-commerceBlack mt-1">
					{translate("orders.reviewTheDetailsBelowBeforePlacingTheOrder")}
				</Typography>
				<Typography className="text-[1rem] font-normal text-commerceBlack mt-1">
					{translate("orders.toEditOrderDetailsSelectAnyTheAboveStepsContinueWithEachStep")}
				</Typography>
			</Box>

			<Box>
				<AccordianUnControlled
					className='border-0'
					labelClass='text-[1.25rem]'
					title={"common.product"}
				>
					<Box>
						<DataTable
							rows={[]}
							columns={productColumns}
						/>
					</Box>

				</AccordianUnControlled>
			</Box>

			<Box>
				<AccordianUnControlled
					className='border-0'
					labelClass='text-[1.25rem]'
					title={"orders.shippingAndBillingAddress"}
				>
					<Box className="flex flex-row px-4 justify-between">
						<AddressPanel
							address={shippingAddress}
							title={translate("orders.shippingAddress")}
						/>
						<AddressPanel
							address={shippingAddress}
							title={translate("orders.billingAddress")}
						/>
					</Box>
				</AccordianUnControlled>
			</Box>

			<Box className="pb-10">
				<AccordianUnControlled
					className='border-0'
					labelClass='text-[1.25rem]'
					title={"orders.shippingMethod"}
				>
					<Box className="flex flex-row px-4 gap-4 ">
						<Typography className="text-[1rem] font-medium text-commerceBlack">
							In-Store
						</Typography>
						<Typography className="text-[1rem] font-normal text-commerceBlack">
							$0.00
						</Typography>
					</Box>
				</AccordianUnControlled>
			</Box>

			<SaveToolbar
				isVisible={true}
				showSave
				showBack
				onClickAction={onToolbarAction}
			/>
		</Box>
	)
}

export default ReviewOrder;