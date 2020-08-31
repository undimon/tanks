export class Utils {
    public static randomInt (min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    public static checkForCollision(a: any, b: any, size: number): boolean {
        return (Math.abs(a.x - b.x) <= size && Math.abs(a.y - b.y) <= size);
    }
}