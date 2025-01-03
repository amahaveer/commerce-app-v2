import IconTextLink from '@/components/atoms/IconTextLink';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import useTranslate from 'hooks/useTranslate';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const OrderPlaceSummary = () => {

    const { translate } = useTranslate();

    const displayLabelWithIcon = (label: string, value: string) => {
        return (
            <Box className="flex flex-row gap-2 items-center">
                <IconTextLink
                    icon={<CheckIcon className='h-5 w-5 text-customGray' />}
                    linkStyle={false}
                    text={`${label}:`}
                    textClass='text-[0.875rem] font-normal'
                />
                <Typography className='text-[0.875rem] font-medium' >{value}</Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Box className="flex flex-col gap-2">
                <Typography className="text-[1.25rem] font-medium text-commerceBlack">
                    {translate("orders.orderSummary")}
                </Typography>

                {displayLabelWithIcon(translate("common.store"), "Store-1")}
                {displayLabelWithIcon(translate("common.currency"), "USD")}
                {displayLabelWithIcon(translate("orders.countrySpecificPricing"), "US")}

                <Box className="mt-4">
                    <Typography className="text-[1rem]">{`${translate("common.for")} Muhammad Nafees`}</Typography>
                    <Typography className="text-[1rem]">{`(muhammad.nafees@royalcyber.com)`}</Typography>
                </Box>

                <Box className="border-b border-gray-300 pb-4 mt-4">
                    <IconTextLink
                        text={`1 items in your cart`}
                        icon={<ShoppingCartOutlinedIcon className="w-5 h-5 text-commerceBlack" />}
                    />
                </Box>

                <Box className="flex flex-col mt-2 pb-4 border-b border-gray-300">
                    <Box className="flex flex-row justify-between">
                        <Typography className="text-[0.875rem] text-commerceBlack">{`R123 TS Surface Mining`}</Typography>
                        <Typography className="text-[0.875rem] text-commerceBlack">{`Qty: 1`}</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                        <Typography className="text-[0.875rem] text-commerceBlack">{`Excavator`}</Typography>
                        <Typography className="text-[0.875rem] text-commerceBlack">{`$12,191.67`}</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                        <Typography className="text-[0.875rem] text-commerceBlack">{`Default`}</Typography>
                    </Box>
                </Box>

                <Box className="flex flex-col mt-2 border-b pb-4 border-gray-300">
                    <Box className="flex flex-row justify-between">
                        <Typography className="text-[0.875rem] text-commerceBlack">{translate("common.subtotal")}</Typography>
                        <Typography className="text-[0.875rem] text-commerceBlack">{`$12,191.67`}</Typography>
                    </Box>

                    <Box className="flex flex-row justify-between">
                        <Typography className="text-[0.875rem] text-commerceBlack">20% Standard VAT for US</Typography>
                        <Typography className="text-[0.875rem] text-commerceBlack">{`+ $2,438.33`}</Typography>
                    </Box>
                </Box>

                <Box className="flex flex-row justify-between">
                    <Typography className="text-[1rem] text-commerceBlack">{"Total (gross)"}</Typography>
                    <Typography className="text-[1rem] text-commerceBlack">{`+ $2,438.33`}</Typography>
                </Box>

            </Box>

        </Box>

    )
}

export default OrderPlaceSummary;