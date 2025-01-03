import AccordianUnControlled from '@/components/atoms/Accordian';
import { Box, Typography } from '@mui/material';
import CustomFieldMapper from '../../customFieldMapper';
import { generalformSchema } from './schema';
import useTranslate from 'hooks/useTranslate';
import IconTextLink from '@/components/atoms/IconTextLink';
import { EmailOutlined, HomeOutlined, ReceiptLongOutlined, ManageSearchOutlined } from '@mui/icons-material';
import { useOrders } from 'context/orders';
import { TranslationKeys } from 'types/global';
import { formatDateTime } from 'utils';
import OrderSummaryCard from '../orderSummary';
import ShippingAdressPanel from '../shippingAndBillingAddressPanel';
import { useEffect, useState } from 'react';
import DataTable from '@/components/atoms/DataTable';
import { orderItemColumns } from './columns';
import { useLanguage } from 'context/language.context';
import { usePermissions } from 'context/permissions.context';

const OrderGeneralInfo = () => {

	const { orderDetails } = useOrders();
	const { locale } = useLanguage()
	const { translate } = useTranslate();
	const { hasPermission } = usePermissions();
	const [orderStates, setOrderStates] = useState<any>({
		orderState: orderDetails.orderState || 'Open',
		shipmentState: orderDetails.shipmentState || 'Pending',
		paymentState: orderDetails.paymentState || 'Pending'
	});

	useEffect(() => {
		setOrderStates({
			orderState: orderDetails.orderState,
			shipmentState: orderDetails.shipmentState,
			paymentState: orderDetails.paymentState
		})
	}, [orderDetails.orderState])

	const onChangeOrderStates = (value: any, field: string) => {
		setOrderStates((prev: any) => ({
			...prev,
			[field]: value
		}))
	}

	const generalFormFeilds = generalformSchema(translate, {
		onChange: onChangeOrderStates,
		hasPermission
	});
	const columns = orderItemColumns(translate, locale);

	const displayText = (label: TranslationKeys, value: string) => {
		return (
			<Box className="flex flex-row">
				<Typography className='font-normal w-28 text-[0.875rem] text-customGray '>{translate(label)}</Typography>
				<Typography className='font-normal text-[0.875rem] text-customGray '>{value}</Typography>
			</Box>
		)
	}

	return (
		<Box className="px-14 pt-3 flex flex-col" >
			<Box className="w-full flex flex-row">

				<Box className="w-[50%]">
					{/* INFO: Order Summary portion */}
					<AccordianUnControlled title='orders.orderSummary' className='border-0' labelClass='text-[1.25rem]'>
						<Box className="flex flex-col gap-2 pl-4">
							<CustomFieldMapper
								formFields={generalFormFeilds}
								formData={orderStates}
							/>
						</Box>
					</AccordianUnControlled>
				</Box>

				<Box className="pl-16">
					<Box className="flex flex-col">
						{displayText("common.dateCreated", formatDateTime(orderDetails.createdAt))}
						{displayText("common.dateModified", formatDateTime(orderDetails.lastModifiedAt))}

						<IconTextLink
							wrapperClass='mt-2'
							textClass='text-[0.875rem]'
							text={translate("common.openChangeHistory")}
							icon={<ManageSearchOutlined />}
						/>
					</Box>
					<OrderSummaryCard orderDetails={orderDetails} />
				</Box>
			</Box>


			<Box className="">
				{/* INFO: Customer portion */}
				<AccordianUnControlled title='customers.customer' className='border-0' labelClass='text-[1.25rem]'>
					<Box className="flex flex-row  p-5">

						<Box className="w-[50%] flex flex-col gap-4">
							<Box className="flex flex-row gap-4">
								<IconTextLink linkStyle={false} text={`${translate("orders.customerEmail")}:`} icon={<EmailOutlined />} />
								<Typography>{orderDetails.customerEmail}</Typography>
							</Box>
							<ShippingAdressPanel
								address={orderDetails.shippingAddress}
								title={translate("orders.shippingAddress")}
							/>
						</Box>

						<Box className="w-[50%]  flex flex-col gap-4">
							<Box className="flex flex-row gap-4">
								<IconTextLink linkStyle={false} text={`${translate("orders.businessUnit")}:`} icon={<EmailOutlined />} />
								<Typography>{orderDetails?.businessUnit?.key}</Typography>
							</Box>
							<Box className="flex flex-col gap-4">
								<IconTextLink linkStyle={false} text={translate("orders.billingAddress")} icon={<ReceiptLongOutlined />} />
								<Box className="flex flex-col gap-1">
									<Typography>{translate("orders.noBillingAddressWasProvidedThisOrderInfo")}</Typography>
								</Box>
							</Box>
						</Box>

					</Box>
				</AccordianUnControlled>
			</Box>

			<Box className="">
				<AccordianUnControlled title='orders.orderItems' className='border-0' labelClass='text-[1.25rem]'>
					<Box>
						<DataTable
							rows={orderDetails.lineItems || []}
							columns={columns}
						/>
					</Box>
				</AccordianUnControlled>

			</Box>
		</Box>
	)
}

export default OrderGeneralInfo;