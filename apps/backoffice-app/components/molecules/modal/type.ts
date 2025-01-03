export interface AlertDialogProps {
  title: string;
  content: any;
  open: boolean;
  onClose: () => void;
}