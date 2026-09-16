import { PageHeader, Card, Badge } from "../../components/UI";
import { inventory } from "../../data/mockData";

export default function InventorySearch() {
  return (
    <div>
      <PageHeader title="Bank-wide inventory" subtitle="Live stock at the connected blood bank, by group." />
      <Card>
        <table>
          <thead>
            <tr>
              <th>Blood group</th>
              <th>Units available</th>
              <th>Near expiry (72h)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row) => (
              <tr key={row.bloodGroup}>
                <td style={{ fontWeight: 600 }}>{row.bloodGroup}</td>
                <td>{row.units}</td>
                <td>{row.nearExpiryUnits > 0 ? `${row.nearExpiryUnits} units` : "—"}</td>
                <td>
                  <Badge>{row.units < 10 ? "Critical" : row.units < 20 ? "Warning" : "Fulfilled"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
