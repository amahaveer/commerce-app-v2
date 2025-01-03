
import AccordianUnControlled from '@/components/atoms/Accordian';
import AppDrawer from '@/components/atoms/AppDrawer';
import CustomButton from '@/components/atoms/Button';
import SearchBar from '@/components/atoms/SearchBar';
import { Box, Typography } from '@mui/material';
import { useOrders } from 'context/orders';
import useTranslate from 'hooks/useTranslate';
import { useState } from 'react';
import AddCustomLineItem from './addCustomLineItem';
import { getLineItemColumns } from './columns';
import { useLanguage } from 'context/language.context';
import DataTable from '@/components/atoms/DataTable';
import { getLineItemBySkuOrVariant } from 'app/api/orders.api';
import SaveToolbar from '@/components/molecules/SaveToolBar';

const OrderCartItems = () => {

    const { onToolbarAction } = useOrders();
    const { translate } = useTranslate();
    const { locale } = useLanguage();
    const [cartItems, setCartItems] = useState([]);
    const [searchedCartItem, setSearchedCartItem] = useState<Array<any>>([]);
    const [openAddDrawer, setOpenAddDrawer] = useState<boolean>(false);

    const lineItemColumns = getLineItemColumns(translate, locale)

    const onSearchItems = async () => {
        const data: Array<any> = await getLineItemBySkuOrVariant();
        setSearchedCartItem(data);
    }

    return (
        <Box className="flex flex-col pt-8 pl-10 pr-6 gap-6">
            <Box className="flex flex-col gap-2">
                <Box className="flex flex-row justify-between">
                    <Typography className="text-[1.25rem] font-medium text-commerceBlack">
                        {translate("common.items")}
                    </Typography>
                    <CustomButton.Add
                        className='w-[12.875rem] h-[2.5rem]'
                        title={translate("orders.addCustomLineItem")}
                        onClick={() => setOpenAddDrawer(true)}
                    />
                </Box>

                <Typography className="text-[1rem] font-medium text-commerceBlack mt-1">
                    {translate("orders.addItemsToYourShoppingCart")}
                </Typography>
                <SearchBar
                    onClickSearch={onSearchItems}
                    className='w-[40.125rem] h-[2.5rem]'
                    placeholder={translate("orders.searchBySkuOrVariantKey")}
                />
                {searchedCartItem.length > 0 &&
                    <DataTable
                        className='mt-2'
                        columns={lineItemColumns}
                        rows={searchedCartItem}
                        padding='14px'
                        getRowHeight={() => 'auto'}
                        autoHeight={true}
                        columnHeaderHeight={40}
                        hideFooter
                    />
                }

            </Box>

            <Box>
                <AccordianUnControlled
                    className='border-0'
                    labelClass='text-[1.25rem]'
                    title={"orders.shoppingCart"}
                >
                    {cartItems.length === 0 ?
                        <Box>
                            <Typography className='text-[1rem] font-medium text-commerceBlack'>
                                {translate("orders.noItemsWereAddedToTheCartYet")}
                            </Typography>
                        </Box>
                        :
                        <Box>

                        </Box>
                    }

                </AccordianUnControlled>
            </Box>

            <AppDrawer open={openAddDrawer} onClose={() => setOpenAddDrawer(false)}>
                <AddCustomLineItem closeDrawer={() => setOpenAddDrawer(false)} />
            </AppDrawer>

            <SaveToolbar
				isVisible={true}
				showNext
				showBack
				onClickAction={onToolbarAction}
			/>
        </Box>
    )
}

export default OrderCartItems;