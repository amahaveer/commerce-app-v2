export interface IImageList {
    url: string;
    label?: string
} 

export interface ImageDraggableComponentProps {
    draggable?: boolean;
    imageList: Array<IImageList>;
    onDeleteImage: (index: number) => void;
    setImageList: (imageList: any) => void;
}