import AccordianUnControlled from '@/components/atoms/Accordian';
import { Box, Typography } from '@mui/material';
import { useOrders } from 'context/orders';
import ShippingAdressPanel from '../shippingAndBillingAddressPanel';
import useTranslate from 'hooks/useTranslate';
import IconTextLink from '@/components/atoms/IconTextLink';
import { Box as BoxIcon } from 'lucide-react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { getDeliveriesColumns } from './column';
import DataTable from '@/components/atoms/DataTable';
import CustomButton from '@/components/atoms/Button';
import AppDrawer from '@/components/atoms/AppDrawer';
import { useState } from 'react';
import AddDelivery from './addDelivery';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EditOrderDelivery from './editDelivery';
import { usePermissions } from 'context/permissions.context';
import { eOrderPermissions } from '@/shared-types/permissions/orderPermissions.type';



const OrderShippingAndDelivery = () => {

	const { orderDetails: { shippingAddress, shippingInfo, lineItems } } = useOrders();
	const { translate } = useTranslate()
	const { hasPermission } = usePermissions();
	const [openAddDeliveryDrawer, setOpenAddDeliveryDrawer] = useState(false);
	const [openEditDeliveryDrawer, setOpenEditDeliveryDrawer] = useState(false);
	const [selectedDeliveryItem, setSelectedDeliveryItem] = useState<any>(null);

	const deliveriesColumn = getDeliveriesColumns(translate)

	const onDeliveryItemClick = (row: any) => {
		// const index = row.api.getRowIndexRelativeToVisibleRows(row.id) + 1;
		setSelectedDeliveryItem({ index: "index", ...row })
	}


	return (
		<Box className="flex flex-row pt-10 px-14">

			<Box className="w-[60%] ">
				<AccordianUnControlled
					isTranslate={false}
					className='border-0'
					labelClass='text-[1.25rem]'
					title={`${shippingAddress?.streetName} ${shippingAddress?.streetNumber}`}
				>
					<Box className="pl-5 flex flex-col gap-6">

						{/* INFO: Shipping Address info */}
						<Box >
							<ShippingAdressPanel
								titleClass='text-[1.125rem]'
								address={shippingAddress}
								title={translate("orders.shippingAddress")}
							/>
						</Box>

						{/* INFO: Shipping Method */}
						<Box className="flex flex-col gap-2">
							<IconTextLink
								textClass='text-[1.125rem]'
								text={translate("orders.shippingMethod")}
								linkStyle={false}
								icon={<BoxIcon className='w-5 h-5' />}
							/>
							<Box className="flex flex-row">
								<Typography className='text-customGray font-normal w-[13rem]'>
									{translate("orders.shippingMethodName")}
								</Typography>
								<Typography className="text-commerceBlack text-[1rem]">
									{shippingInfo?.shippingMethodName || '--'}
								</Typography>
							</Box>
						</Box>

						{/* INFO: Deliveries */}
						<Box className="flex flex-col gap-4">
							<IconTextLink
								textClass='text-[1.125rem]'
								text={translate("orders.deliveries")}
								linkStyle={false}
								icon={<LocalShippingOutlinedIcon />}
							/>
							<DataTable
								rows={shippingInfo.deliveries || []}
								columns={deliveriesColumn}
								onRowClick={onDeliveryItemClick}
							/>
							{hasPermission(eOrderPermissions.CREATE_DELIVERY) &&
								<CustomButton.Add
									onClick={() => setOpenAddDeliveryDrawer(true)}
									className='w-[10.1rem] h-[2.5rem]'
									title={translate("orders.addADelivery")}
								/>
							}
						</Box>
					</Box>
				</AccordianUnControlled>
			</Box>

			<Box className="ml-auto fixed left-[64%] flex flex-col gap-2">
				<Typography className="text-[0.875rem] font-normal text-commerceBlack">{`(${lineItems.length}) 
						${translate("orders.itemsAssociatedWithAddress")} `}
				</Typography>
				<IconTextLink
					textClass='text-[0.875rem] font-normal'
					text={translate("orders.seeItemsDetail")}
					icon={<ShoppingCartOutlinedIcon fontSize='small' />}
				/>
			</Box>

			<AppDrawer open={openAddDeliveryDrawer} onClose={() => setOpenAddDeliveryDrawer(false)}>
				<AddDelivery />
			</AppDrawer>

			<AppDrawer open={openEditDeliveryDrawer} onClose={() => setOpenEditDeliveryDrawer(false)}>
				<EditOrderDelivery />
			</AppDrawer>
		</Box>
	)
}

export default OrderShippingAndDelivery;