export interface Work {
    id: string;
    callback: () => void;
}
export default class WorkerInterval {
    private works;
    private readonly worker;
    constructor();
    setInterval(callback: () => void, delay: number): string | null;
    clearInterval(id: string): void;
    private onMessage;
}
