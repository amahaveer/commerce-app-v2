import AccordianUnControlled from '@/components/atoms/Accordian';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import RadioButtonsGroup from '@/components/atoms/RadioGroup';
import { CloseOutlined } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useOrders } from 'context/orders';
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import { getAddressTitlePanelOptions } from 'utils/order';
import EditIcon from '@mui/icons-material/Edit';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { getAddressFormSchema } from './schema';
import { IOrderAddressSelectionProps } from '../types';
import AddressFormLayout from './addressFormLayout';
import { fetchCustomerAddressesById } from 'app/api/customer.api';
import SaveToolbar from '@/components/molecules/SaveToolBar';

const OrderAddressSelection = (props: IOrderAddressSelectionProps) => {

    const { onSelectCustomer } = props;
    const { translate } = useTranslate();
    const { mappedOrderData: { customer }, onToolbarAction } = useOrders();
    const [addresses, setAddresses] = useState<any>({ shippingAddress: [], billingAddress: [] });
    const [editAddressIndex, setEditAddressIndex] = useState<number>(0)
    const [editAddressId, setEditAddressId] = useState<string | null>(null)

    const addressFields = getAddressFormSchema(translate)

    const backToCustomerSelection = () => {
        onSelectCustomer(null)
    }

    const getCustomerAddresses = async () => {
        const data = await fetchCustomerAddressesById("customerid");
        setAddresses(data);
    }

    useEffect(() => {
        getCustomerAddresses()
    }, [])

    return (
        <Box className="flex flex-col items-center pt-5 gap-5">
            <Box className="w-[46.375rem] flex flex-col gap-2 px-4">
                <Typography className='text-[1.25rem] leading-[1.7rem] font-medium text-commerceBlack'>
                    {translate("customers.customer")}
                </Typography>
                <Typography className='text-commerceBlack font-medium text-[1rem]'>
                    {translate("orders.defineShippingAndBillingAddress")}
                </Typography>
                <Box className="flex flex-row w-full gap-2">
                    <PrefixInputBase
                        wrapperClass='w-full'
                        prefix={null}
                        value={customer.selectedCustomer?.email}
                        disabled
                    />
                    <Tooltip title={translate("orders.deselectCustomer")} placement='top'>
                        <IconButton onClick={backToCustomerSelection}>
                            <CloseOutlined />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box className='w-[46.375rem] pb-10'>
                <AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"orders.shippingAddress"}>
                    <Box className="flex flex-col gap-2">
                        <AddressFormLayout
                            address={addresses.shippingAddress}
                            editAddressId={editAddressId}
                            setEditAddressId={setEditAddressId}
                            onSaveAddress={() => { }}
                        />
                    </Box>
                </AccordianUnControlled>

                <AccordianUnControlled className='border-0' labelClass='text-[1.25rem]' title={"orders.billingAddress"}>
                    <Box className="flex flex-col gap-2">
                        <AddressFormLayout
                            address={addresses.billingAddress}
                            editAddressId={editAddressId}
                            setEditAddressId={setEditAddressId}
                            onSaveAddress={() => { }}
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

export default OrderAddressSelection;