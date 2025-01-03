export enum eSwitchIcons {
  SEARCH = 'search',
  CODE = 'code',
  FLOW = 'flow'
}

export interface ISwitchViewerData {
  name: string;
  displayText?: string;
  icon: eSwitchIcons;
}

export interface IViewSwitcherProps {
  switchData: Array<any>;
  defaultSelected?: number;
  onClick: (item: ISwitchViewerData) => void;
}
