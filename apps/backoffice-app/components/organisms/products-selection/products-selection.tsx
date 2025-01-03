'use client';
import { getDummyData } from 'app/api/productSelection.api';
import useTranslate from 'hooks/useTranslate';
import { IProductTableProps } from 'types/product.type';
import { getProductSearchOptions } from 'utils/product';
import ListTemplate from '../ListTemplate';
import { useRouter } from 'next/navigation';

const ProductsSelection = (props: IProductTableProps) => {
  const products = getDummyData();
  const { columns } = props;
  const options = getProductSearchOptions();
  const { translate } = useTranslate();
  const router = useRouter();

  const onClickAddCustomer = () =>
    router.push('/products/product-selections/new');
  const onClickRow = (row: any) => {};

  return (
    <ListTemplate>
      <>
        <div className="mb-10">
          <ListTemplate.Header
            title={translate('product.productSelections')}
            totalCount={5}
            addButton={{
              title: translate('product.addProductSelection'),
              onClick: onClickAddCustomer
            }}
            //   viewsDropdown={{ options: [], onSelect: onSelectView }}
          />
        </div>
        <ListTemplate.MainContent
          dataTable={{
            columns: columns,
            rows: products,
            checkboxSelection: true,
            disableRowSelectionOnClick: true,
            onRowClick: onClickRow
          }}
        />
      </>
    </ListTemplate>
  );
};

export default ProductsSelection;
