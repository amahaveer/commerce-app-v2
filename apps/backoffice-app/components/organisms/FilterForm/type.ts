import { IFilterSchema } from "types/global";

export interface IFilterFormGeneratorProps {
    filterData: Array<IFilterSchema>;
    onSelectFilterHandler: (item: any, value: string) =>  void;
}