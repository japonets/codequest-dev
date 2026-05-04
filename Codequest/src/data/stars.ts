type Star = {
    x: number;
    y: number;
    radius: number;
    opacity: number;
}

type ShinyStar = Star & {
    shine: number;
}

export type { Star, ShinyStar };