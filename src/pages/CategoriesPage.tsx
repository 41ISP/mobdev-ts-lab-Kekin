import { formatMoney } from "../format"
import { Link } from "react-router-dom"
import { usePaymentsStore } from "../store"
import { TCategory } from "../types"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"

interface Row {
    categoty: TCategory;
    count: number;
    paidCount: number;
    total: number;
    due: number;
}

export default function CategoriesPage() {
    const items = usePaymentsStore((state) => state.items);
    const initialRows = Object.fromEntries(
        CATEGORY_LIST.map((cat) => [
            cat,
            { category: cat, count: 0, paidCount: 0, total: 0, due: 0 },
        ])
    ) as Record<TCategory, Row>;

    const stats = items.reduce((acc, p) => {
        const row = acc[p.category];
        row.count += 1;
        row.total += p.amount;

        if (p.paid) {
            row.paidCount += 1;
            row.due = p.amount;
        }
        return acc;
    }, initialRows);

    const rows = Object.values(stats).filter((row) => row.count > 0).sort((a, b) => b.total - a.total);

    if (rows.length === 0) {
        return (
            <p className="empty">
                Данных пока нет. <Link to="/">Добавить подписку</Link>
            </p>
        );
    }

}
return (
    <ul className="list">
        {rows.map((r) => (
            <li key={r.category} className="cat">
                <div className={`cat__head ${r.category}`}>
                    <span>{CATEGORY_LABELS[r.category]}</span>
                    <span>{r.count} шт.</span>
                </div>
                <div className="cat__body">
                    <p className="cat__total">{formatMoney(r.total)}</p>
                    <div className="meter" aria-hidden="true">
                        <i style={{ width: `${r.total === 0 ? 0 : ((r.total - r.due) / r.total) * 100}%`}}></i>
                    </div>
                    <p className="row">
                        <span>Оплачено</span>
                        <b>
                            {r.paidCount} из {r.count}
                        </b>
                    </p>
                    <p className="row">
                        <span>К оплате</span>
                        <b>{formatMoney(r.due)}</b>
                    </p>
                </div>
            </li>
        ))}
    </ul>
);
}
