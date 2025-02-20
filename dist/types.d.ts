export type IconValues = (string | number | number[])[];
export interface IconObj {
    x: number;
    y: number;
    width: number;
    height: number;
    paths: string[];
}
export function addFamily(name: string, set: Record<string, IconValues>): void;
export function getFamilies(): Record<string, Record<string, IconValues>>;
export function getFamily(name: string): Record<string, IconValues> | undefined;
export function getIcon(family: string, name: string): IconObj;
export function makeIcon(family: string, name: string, customClasses?: string[]): string;

//# sourceMappingURL=types.d.ts.map
