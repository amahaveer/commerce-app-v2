import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { formatCurrency } from 'utils';


const OrderSummaryCard = (props: any) => {

    if (!props.orderDetails) return;

    const { orderDetails: { taxedPrice, shippingInfo } } = props;
    const { translate } = useTranslate();

    return (
        <Box className="w-[35.4rem] h-[13.675rem] shadow-summaryCard border border-gray-300 mt-4 p-4" >
            <Box className="flex flex-row justify-between" >
                <Typography className='text-[0.875rem] text-commerceBlack'>
                    {translate("orders.orderOriginalSubtotal")}
                </Typography>
                <Typography className='text-[0.875rem]'>{formatCurrency(taxedPrice?.totalNet)}</Typography>
            </Box>

            {taxedPrice?.taxPortions.map((tax: any, index: number) => (
                <Box key={index} className="flex flex-row justify-between" >
                    <Typography className='text-[0.875rem] text-commerceBlack' >
                        {`${translate("common.tax")}: ${tax?.rate * 100}% ${tax?.name}`}
                    </Typography>
                    <Typography className='text-[0.875rem]'>{`+ ${formatCurrency(tax?.amount)}`}</Typography>
                </Box>
            ))}

            <Box className="flex flex-row justify-between mt-2 bg-customBlue-aliceBlue" >
                <Typography className='text-[0.875rem] text-commerceBlack font-medium' >
                    {translate("orders.orderOriginalSubtotal")}
                </Typography>
                <Typography className='text-[0.875rem] text-commerceBlack font-medium'>
                    {formatCurrency(taxedPrice?.totalGross)}
                </Typography>
            </Box>

            <Box className="flex flex-row justify-between mt-6" >
                <Typography className='text-[0.875rem] text-commerceBlack'>
                    {translate("orders.shippingCostIncTaxStandardShippingMehtod")}
                </Typography>
                <Typography  className='text-[0.875rem]'>
                    {`+ ${formatCurrency(shippingInfo?.price)}`}
                </Typography>
            </Box>

            <Box className="flex flex-row justify-between mt-8 border-t border-gray-300 pt-3" >
                <Typography className='text-[1rem] text-commerceBlack font-medium'>
                    {translate("orders.orderFinalTotalGross")}
                </Typography>
                <Typography className='text-[1rem] text-commerceBlack font-medium'>
                    {formatCurrency(taxedPrice?.totalGross)}
                </Typography>
            </Box>
        </Box>
    )
}

export default OrderSummaryCard;