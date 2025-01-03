import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductReviewForm from './ProductReviewForm';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

const ProductReviewTabs = ({description, attributes}:{description:string, attributes: Record<string, any>}) => {
  return (
    <div className=" container w-full pb-[140px] border-b border-b-[1px] border-[var(--tp-common-grey-border)] ">
      <Tabs defaultValue="description">
        <TabsList className="flex justify-center border-b border-gray-200 bg-transparent border-b border-b-[1px] border-[var(--tp-common-grey-border)] pb-[12px] ">
          <TabsTrigger
            value="description"
            className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors duration-300 border-b-1 data-[state=active]:shadow-none text-[20px] "
            // data-state-active="active"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors duration-300 border-b-1 data-[state=active]:shadow-none text-[20px] "
            // data-state-active="active"
          >
            Additional information
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors duration-300 border-b-1 data-[state=active]:shadow-none text-[20px] "
            // data-state-active="active"
          >
            Reviews (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <div className="pt-[40px] flex justify-center">
            <p>
              {description}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="additional">
        <Table>
    
      <TableBody>
        {Object.keys(attributes).map((attribute, index) => (
          <TableRow key={index}>
            <TableCell>{attribute}</TableCell>
            <TableCell>{attributes[attribute]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="pt-[40px] flex justify-center ">
           <ProductReviewForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductReviewTabs;
