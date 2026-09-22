import { PageHeader, Card, Badge } from "../../components/UI";
import { inventory } from "../../data/mockData";

export default function AdminInventory() {
  return (
    <div>
      <PageHeader
        title="Inventory management"
        subtitle="Stock is tracked FEFO — first-expiry units are surfaced for dispatch first."
        action={<button className="btn">+ Log new stock</button>}
      />
      <Card>
        <table>
          <thead>
            <tr>
              <th>Blood group</th>
              <th>Units</th>
              <th>Near-expiry (72h)</th>
              <th>Earliest expiry</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row) => (
              <tr key={row.bloodGroup}>
                <td style={{ fontWeight: 600 }}>{row.bloodGroup}</td>
                <td>{row.units}</td>
                <td>{row.nearExpiryUnits > 0 ? `${row.nearExpiryUnits} units` : "—"}</td>
                <td>{row.earliestExpiry}</td>
                <td><Badge>{row.units < 10 ? "Critical" : row.units < 20 ? "Warning" : "Fulfilled"}</Badge></td>
                <td><button className="btn btn--ghost">Adjust</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
