export default interface IntervalWork {
    id: string;
    name: string;
    delay?: number;
}
export interface ScheduledIntervalWork {
    id: string;
    intervalId: number;
}
