import { useState } from 'react';
import { TCategory, INewPayment } from '../types';
import { CATEGORY_LIST, CATEGORY_LABELS } from '../categories';
import { usePaymentsStore } from '../store';

const getToday = () => {
    return new Date().toISOString().split("T")[0];
};

export default function PaymentForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [due, setDue] = useState(getToday());
    const [category, setCategory] = useState<TCategory>("video");
    const [error, setError] = useState("");

    const addPayment = usePaymentsStore((state) => state.addPayment);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const normalizedAmount = amount.trim().replace(",", ".");
        const amountNumber = Number(normalizedAmount);
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setError("Введите название подписки");
            return;
        }
        if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
            setError("Введите корректную цену (больше нуля)");
            return;
        }
        if (!due) {
            setError("Укажите дату списания");
            return;
        }

        const newPaymentData: INewPayment = {
            title: trimmedTitle,
            amount: amountNumber,
            due: due,
            category: category,
        };

        addPayment(newPaymentData);
        setTitle("");
        setAmount("");
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} className="box">
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    maxLength={60}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input type="text"
                        inputMode="decimal"
                        placeholder="0"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>

                <label className="field">
                    <span>Оплатить до</span>
                    <input type="date" value={due}
                        onChange={(e) => setDue(e.target.value)} />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select value={category}
                    onChange={(e) => setCategory(e.target.value as TCategory)}>
                    {CATEGORY_LIST.map((cat) => (
                        <option key={cat} value={cat}>
                            {CATEGORY_LABELS[cat]}
                        </option>
                    ))}
                </select>
            </label>

            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    );
}
