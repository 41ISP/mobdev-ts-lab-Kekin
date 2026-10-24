import PaymentForm from "../components/PaymentForm"
import PaymentItem from "../components/PaymentItem"
import { formatMoney } from "../format"
import { usePaymentsStore } from "../store"

export default function PaymentsPage() {
    const items = usePaymentsStore((state) => state.items);
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const paid = items.filter((item) => item.paid).reduce((sum, item) => sum + item.amount, 0);

    const sorted = [...items].sort((a, b) => {
        const paidDiff = Number(a.paid) - Number(b.paid);
        if (paidDiff !== 0) return paidDiff;
        return a.due.localeCompare(b.due)
    });

    return (
        <>
            <section className="sum" aria-label="Итоги месяца">
                <small>Всего в месяц</small>
                <b>{formatMoney(total)}</b>
                <div className="split">
                    <div>
                        <small>Оплачено</small>
                        <strong>{formatMoney(paid)}</strong>
                    </div>
                    <div>
                        <small>Осталось</small>
                        <strong>{formatMoney(total - paid)}</strong>
                    </div>
                </div>
            </section>

            <PaymentForm />

            <h2 className="h plain">Ближайшие платежи</h2>
            {sorted.length === 0 ? (
                <p className="empty">
                    Подписок пока нет. Добавьте первую в форме выше.
                </p>
            ) : (
                <ul className="list">
                    {sorted.map((p) => (
                        <PaymentItem key={p.id} payment={p} />
                    ))}
                </ul>
            )}
        </>
    )
}
