export {};

declare global {
    interface String {
        format(..._args: any[]): string;
    }
    interface Array<T> {
        indexOf(d, e): number;
    }
}