// Type stub for colorthief
declare module "colorthief" {
  export declare function getColor(
    img: string,
    quality?: number,
  ): Promise<[number, number, number]>;
}
