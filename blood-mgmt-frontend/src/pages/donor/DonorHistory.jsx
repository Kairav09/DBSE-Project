import { PageHeader, Card, Badge } from "../../components/UI";
import { donationHistory } from "../../data/mockData";

export default function DonorHistory() {
  return (
    <div>
      <PageHeader title="Donation history" subtitle="Every unit you've given, and where it went." />
      <Card>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((d) => (
              <tr key={d.id}>
                <td>{d.date}</td>
                <td>{d.location}</td>
                <td>{d.units}</td>
                <td><Badge>{d.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
