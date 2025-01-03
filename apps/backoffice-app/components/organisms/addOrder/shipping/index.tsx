import AccordianUnControlled from '@/components/atoms/Accordian';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import ShippingAdressPanel from '../../orderDetails/shippingAndBillingAddressPanel';
import { useEffect, useState } from 'react';
import { getShippingMethodColumns } from './columns';
import DataTable from '@/components/atoms/DataTable';
import IconTextLink from '@/components/atoms/IconTextLink';
import SaveToolbar from '@/components/molecules/SaveToolBar';
import { useOrders } from 'context/orders';


const OrderShippingMethod = () => {

	const { translate } = useTranslate();
	const { onToolbarAction } = useOrders()
	const [shippingAdress, setShippingAdress] = useState<any>();
	const [shippingMethods, setShippingMethods] = useState<Array<any>>([]);

	const shippingMethodColumns = getShippingMethodColumns(translate);

	useEffect(() => {
		setShippingAdress({
			name: "william john", streetName: "123 No, 582 Queens Street", apartment: "1", city: "Orlando",
			region: "Florida", country: "US"
		})
		setShippingMethods([
			{ id: 1, name: "In-Store", shippingRate: "$0.00", taxCategory: "FR", default: "Yes", description: "In-Store (EN-US)" }
		])
	}, [])

	return (
		<Box className="flex flex-col pt-8   pr-6 gap-6">
			<Box className="flex flex-col pl-10 ">
				<Typography className="text-[1.25rem] font-medium text-commerceBlack">
					{translate("common.shipping")}
				</Typography>
				<Typography className="text-[1rem] font-medium text-commerceBlack mt-1">
					{translate("orders.selectAShippingMethod")}
				</Typography>
			</Box>

			<Box className="flex flex-col pl-6 pb-10">
				<AccordianUnControlled
					className='border-0'
					labelClass='text-[1.25rem]'
					title={"orders.shippingAddress"}
				>
					<Box>
						<ShippingAdressPanel
							address={shippingAdress}
							title={translate("orders.shippingAddress")}
						/>
					</Box>
				</AccordianUnControlled>

				<AccordianUnControlled
					className='border-0'
					labelClass='text-[1.25rem]'
					title={"orders.shippingMethods"}
				>
					<Box className="mt-5">
						{shippingMethods?.length === 0 ?
							<Box className="felx flex-col">
								<Typography className='text-[1rem] font-normal text-commerceBlack ml-2'>
									{translate("orders.thereAreNoShippingMethodsThatMatchTheSelectedShippingAddress")}
								</Typography>
								<IconTextLink text={translate("orders.addShippingMethod")} />
							</Box>
							:
							<DataTable
								columns={shippingMethodColumns}
								rows={shippingMethods}
								hideFooter
							/>
						}

					</Box>
				</AccordianUnControlled>
			</Box>

			<SaveToolbar
				isVisible={true}
				showNext
				showBack
				onClickAction={onToolbarAction}
			/>
		</Box>
	)
}

export default OrderShippingMethod