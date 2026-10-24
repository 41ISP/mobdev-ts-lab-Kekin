export type TCategory = 'video' | 'apps' | 'mobile' | 'other';
export interface IPayment {
    id: string;
    title: string;
    amount: number;
    due: string;
    category: TCategory;
    paid: boolean;
}

export type INewPayment = Omit<IPayment, 'id' | 'paid'>;