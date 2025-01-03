import { ReactNode } from "react";

export interface ISaveToolbarProps {
  isVisible: boolean;
  showNext?: boolean;
  showBack?: boolean;
  showSave?: boolean;
  onClickAction: (type: eToolbarButtonActions) => void;
}

export enum eToolbarButtonActions {
  NEXT = "next",
  BACK = "back",
  SAVE = "save",
  CANCEL = "cancel",
}