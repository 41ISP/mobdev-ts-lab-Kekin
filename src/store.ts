import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {nanoid} from 'nanoid';
import { IPayment, INewPayment } from './types';

export interface IPaymentsState {
    items: IPayment[];
    addPayment: (data: INewPayment) => void;
    removePayment: (id: string) => void;
    togglePaid: (id: string) => void;
}

export const usePaymentsStore = create<IPaymentsState>()(
    persist(
        (set) => ({
            items: [],
            addPayment: (data) =>
               set((state) => ({items: [...state.items,{...data, id: nanoid(), paid: false,}, 
               ],
            })),

        removePayment: (id) =>
            set((state) => ({
                items: state.items.filter((payment) => payment.id !== id), 
            })),

        togglePaid: (id) =>
            set((state) => ({
                items: state.items.map((payment) => payment.id === id ? 
                {...payment, paid: !payment.paid } : payment ),
            })),
        }),
        { name: "payments", storage: createJSONStorage(() => localStorage) },
    ),
);