import { PageHeader, Card } from "../../components/UI";
import { currentDonor, bloodGroups } from "../../data/mockData";

export default function DonorProfile() {
  const userName = localStorage.getItem("userName") || currentDonor.name;
  const userSub = localStorage.getItem("userSub") || `${currentDonor.bloodGroup} · ${currentDonor.city}`;
  const [bg, city] = userSub.split(" · ");

  return (
    <div>
      <PageHeader title="My profile" subtitle="Keep this accurate — it's what hospitals see when you're matched." />
      <Card>
        <form
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", maxWidth: 560 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label>Full name</label>
            <input defaultValue={userName} />
          </div>
          <div>
            <label>Blood group</label>
            <select defaultValue={bg || currentDonor.bloodGroup}>
              {bloodGroups.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label>City</label>
            <input defaultValue={city || currentDonor.city} />
          </div>
          <div>
            <label>Contact number</label>
            <input placeholder="+91 " />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Last donation date</label>
            <input type="date" defaultValue={currentDonor.lastDonation} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button className="btn" type="submit">Save changes</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
