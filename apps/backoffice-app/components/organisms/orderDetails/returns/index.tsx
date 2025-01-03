import CustomButton from '@/components/atoms/Button';
import { Box, IconButton, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { useState } from 'react';
import AppDrawer from '@/components/atoms/AppDrawer';
import AddOrderReturns from './addReturns';
import AccordianUnControlled from '@/components/atoms/Accordian';
import { useOrders } from 'context/orders';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getOrderReturnListColumns } from './columns';
import DataTable from '@/components/atoms/DataTable';
import { formatDateTime } from 'utils';
import { usePermissions } from 'context/permissions.context';
import { eOrderPermissions } from '@/shared-types/permissions/orderPermissions.type';

const OrderReturnsComponent = () => {

	const { translate } = useTranslate();
	const { orderDetails: { returnInfo } } = useOrders();
	const { hasPermission } = usePermissions();
	const [openAddReturnDrawer, setOpenAddReturnDrawer] = useState(false);


	const onClickItemDetails = (row: any, index: number) => {
		console.log(row, "==onClickItemDetails==", index)
	}

	const columnPayload = {
		onClickItemDetails: onClickItemDetails
	}

	const columns = getOrderReturnListColumns(translate, columnPayload);

	return (
		<Box className="px-10 pt-8">

			<Box className="flex flex-col gap-3">
				<Typography className='font-semibold text-[1rem] text-commerceBlack' >
					{`${translate("orders.returnInformation")} (${returnInfo?.length || 0})`}
				</Typography>
				{hasPermission(eOrderPermissions.CREATE_RETURN) &&
					<CustomButton
						className='w-[9.65rem] h-[2.5rem]'
						title={translate("orders.createReturn")}
						icon={<CompareArrowsOutlinedIcon />}
						onClick={() => setOpenAddReturnDrawer(true)}
					/>
				}
				{!returnInfo || !returnInfo.length &&
					<Typography className='text-[1rem] font-normal'>
						{translate("orders.noReturnsHaveBeenCreated")}.
					</Typography>
				}
			</Box>

			<Box className="mt-5">
				{returnInfo?.length > 0 && returnInfo.map((item: any, index: number) => (
					<AccordianUnControlled
						key={index}
						isTranslate={false}
						className="border-0"
						labelClass="text-[1.25rem]"
						title={`Return: ${index + 1}`}
					>
						<Box className="flex flex-col gap-2">
							<Box className="flex flex-row">
								<Typography className='font-normal w-36 text-[1rem] text-customGray'>{translate("orders.returnTrackingId")}</Typography>
								<Typography className='font-normal text-[1rem] text-commerceBlack'>{item.returnTrackingId || '--'}</Typography>
							</Box>
							<Box className="flex flex-row">
								<Typography className='font-normal w-36 text-[1rem] text-customGray'>{translate("orders.returnDate")}</Typography>
								<Typography className='font-normal  text-[1rem] text-commerceBlack'>{formatDateTime(item.returnDate) || '--'}</Typography>
							</Box>
							<Box className="mt-4">
								<Typography className='text-[1rem] font-normal text-commerceBlack'>{translate("orders.assignShipmentAndPaymentStatesToTheLineItems")}</Typography>
								<Box className="flex items-center gap-1">
									<IconButton className='text-customBlue-sky w-3 h-3' aria-label="Info">
										<InfoOutlinedIcon className='w-4 h-4' />
									</IconButton>
									<Typography className='text-[1rem] font-normal text-commerceBlack'>{translate("orders.addCustomFieldsToReturnItems")}</Typography>
								</Box>
							</Box>

							<DataTable
								columns={columns}
								rows={item.items || []}
								getRowHeight={() => 'auto'}
								autoHeight={true}
								disableRowSelectionOnClick={true}
								padding='14px'
							/>
						</Box>
					</AccordianUnControlled>
				))}
			</Box>

			<Box>
				<AppDrawer open={openAddReturnDrawer} onClose={() => setOpenAddReturnDrawer(false)} >
					<AddOrderReturns />
				</AppDrawer>
			</Box>

		</Box>
	)
}

export default OrderReturnsComponent;