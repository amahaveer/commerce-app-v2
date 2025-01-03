export interface Image {
    url: string;
    dimensions: ImageDimensions;
    label?: string;
}
export interface ImageDimensions {
    w: number;
    h: number;
}