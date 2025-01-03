import {
  Cross1Icon,
  ChevronRightIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';

const allOptions = [
  { name: 'Home' },
  { name: 'Products' },
  { name: 'eCommerce' },
  { name: 'More Pages' },
  { name: 'Coupons' },
  { name: 'Blog' },
  { name: 'Contact' },
];

export type NavigationModalProps = {
  setOpenNavModal: any;
  toggleCategoryList: any;
  openCategoryList: boolean;
  categories: any;
  locale: any;
};

const NavigationModal = (props: NavigationModalProps) => {
  return (
    <div className="absolute top-0 left-0 h-lvh w-lvw bg-white lg:hidden z-10 text-xl">
      <div className="flex ml-6 mt-6">
        <p className="font-bold text-3xl">Bonelli</p>
        <Cross1Icon
          className="ml-auto mr-6 mt-2 h-6 w-6"
          onClick={() => props.setOpenNavModal(false)}
        />
      </div>

      <div className="flex m-6 p-3 bg-blue-600 text-white rounded items-center">
        <HamburgerMenuIcon className="mr-3 h-6 w-6" />
        <p className="mr-3">All Categories</p>
        <ChevronDownIcon
          className="ml-auto mr-6 h-6 w-6"
          onClick={props?.toggleCategoryList}
        />
      </div>

      {props?.openCategoryList && (
        <div className="ml-10 p-3">
          {props?.categories?.results.map((category: any) => (
            <div className="flex pb-6 items-center">
              <p>{`${category.name[props?.locale as keyof typeof category.name]}`}</p>
              <ChevronDownIcon className="ml-auto mr-12" />
            </div>
          ))}
        </div>
      )}

      <div className="ml-6 mt-6">
        {allOptions.map((option) => (
          <div className="flex">
            <p className="p-3">{`${option.name}`}</p>
            <ChevronRightIcon className="ml-auto mt-3 mr-6 h-6 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationModal;
