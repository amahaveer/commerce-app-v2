export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface GlobalTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  contentClass?: string;
  tabsWrapperClass?: string;
  tabsChildren?: React.ReactNode;
}