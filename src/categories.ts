import { TCategory } from "./types";
export const CATEGORY_LABELS: Record<TCategory, string> = {
    video: "Видео и музыка",
    apps: "приложения",
    mobile: "Связь",
    learning: "Обучение",
    other: "Другое",
};

export const CATEGORY_LIST = Object.keys(CATEGORY_LABELS) as TCategory[];