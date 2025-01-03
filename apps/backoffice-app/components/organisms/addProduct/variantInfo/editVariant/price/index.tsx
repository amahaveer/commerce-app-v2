import DataTable from '@/components/atoms/DataTable';
import { Box } from '@mui/material';
import { variantPriceColumns } from './column';
import CustomButton from '@/components/atoms/Button';
import { useEffect, useState } from 'react';
import AppDrawer from '@/components/atoms/AppDrawer';
import AddVariantPrice from './addPrice';
import useTranslate from 'hooks/useTranslate';
import { useProducts } from 'context/product';
import { formatCurrency } from 'utils';

interface IPropsType {
  variantId: number;
}

const VariantPrices = (props: IPropsType) => {
  const { variantId } = props;
  const { translate } = useTranslate();
  const {
    mappedProductData: { variants, masterVariant }
  } = useProducts();
  const [openAddPriceDrawer, setopenAddPriceDrawer] = useState<boolean>(false);
  const [initialPriceData, setInitialPriceData] = useState<any>(null);
  const [prices, setPrices] = useState([]);

  console.log('initialPriceDatainitialPriceData', initialPriceData);

  useEffect(() => {
    let counter = 1;
    const allVariants = [...variants, masterVariant];

    const selectedVariant: any = allVariants.find(
      (variant) => variant?.id === variantId
    );
    console.log(allVariants, 'prodListprodList==>', selectedVariant);
    if (selectedVariant?.prices) {
      const filteredData = selectedVariant.prices.map((item: any) => {
        const priceTier = item?.tiers?.map(
          (cent: { value: { centAmount: any } }) => cent?.value?.centAmount
        )?.[0];

        const updatePri = formatCurrency(priceTier);

        return {
          no: counter++,
          id: item.id,
          pricetiers: item?.tiers?.map(
            (cent: { value: { centAmount: any } }) => cent?.value?.centAmount
          )?.[0],
          channelId: item.channelId,
          country: item.country,
          validFrom: item.validFrom,
          validUntil: item.validUntil,
          ...item.value
        };
      });
      setPrices(filteredData);
    }
  }, []);

  const onAddNewPrice = () => {
    setopenAddPriceDrawer(true);
  };

  const onCloseDrawer = () => {
    setopenAddPriceDrawer(false);
    setInitialPriceData(null);
  };

  const onClickRow = ({ row }: any) => {
    setInitialPriceData(row);
    setopenAddPriceDrawer(true);
  };

  return (
    <Box className="flex flex-col px-4 pt-10">
      <Box className="flex">
        <CustomButton.Add
          className="ml-auto"
          title={translate('product.addEmbeddedPrice')}
          onClick={onAddNewPrice}
        />
      </Box>

      <Box className="pt-10">
        <DataTable
          columns={variantPriceColumns}
          rows={prices}
          onRowClick={onClickRow}
        />
      </Box>

      {/* Use For Both Edit/Add */}
      <AppDrawer open={openAddPriceDrawer} onClose={onCloseDrawer}>
        <AddVariantPrice initialPriceData={initialPriceData || {}} />
      </AppDrawer>
    </Box>
  );
};

export default VariantPrices;
