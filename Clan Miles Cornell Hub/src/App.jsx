import React, { useMemo, useState } from "react";
import { CalendarDays, Car, Map, Trophy, Home, ListChecks } from "lucide-react";
import { soccerSchedule } from "./data/soccerSchedule";
import { keyDates } from "./data/keyDates";
import { hotels, restaurants, outdoorActivities } from "./data/places";
import { bucketList } from "./data/bucketList";
import "./styles.css";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "soccer", label: "Men’s Soccer", icon: Trophy },
  { id: "travel", label: "Travel", icon: Car },
  { id: "ithaca", label: "Ithaca Guide", icon: Map },
  { id: "bucket", label: "Bucket List", icon: ListChecks },
  { id: "dates", label: "Key Dates", icon: CalendarDays }
];

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function Badge({ children, tone = "red" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Card({ title, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Dashboard() {
  const priority = soccerSchedule.filter((match) => match.priority);
  const upcoming = soccerSchedule.slice(0, 5);

  return (
    <div className="grid">
      <Card title="Next Big Anchor" className="hero-card span-8">
        <div className="large">Family Weekend · Sept. 25–27</div>
        <p>Harvard at home on Saturday, Sept. 26 makes this the first major Cornell family weekend.</p>
        <Badge>Book lodging</Badge>
        <Badge tone="gold">Harvard home</Badge>
        <Badge tone="green">Ithaca weekend</Badge>
      </Card>

      <Card title="Season Snapshot" className="span-4">
        <div className="metric">{soccerSchedule.length}</div>
        <p>Known matches and placeholders loaded.</p>
        <Badge>{priority.length} priority trips</Badge>
      </Card>

      <Card title="Upcoming Schedule" className="span-12">
        <div className="list">
          {upcoming.map((match) => (
            <div className="list-row" key={`${match.date}-${match.opponent}`}>
              <strong>{formatDate(match.date)} · {match.opponent}</strong>
              <span>{match.location} · {match.competition} · {match.travelStatus}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Soccer() {
  return (
    <Card title="2026 Cornell Men’s Soccer Schedule">
      <p className="muted">Parent-supplied schedule. Update kickoff, venue, tickets, and travel notes as details become official.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Location</th>
              <th>Competition</th>
              <th>Kickoff</th>
              <th>Venue</th>
              <th>Travel</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {soccerSchedule.map((match) => (
              <tr key={`${match.date}-${match.opponent}`}>
                <td>{formatDate(match.date)}</td>
                <td>
                  <strong>{match.opponent}</strong>
                  {match.priority && <Badge tone="gold">Priority</Badge>}
                </td>
                <td className={match.location.toLowerCase()}>{match.location}</td>
                <td>{match.competition}</td>
                <td>{match.kickoff}</td>
                <td>{match.venue}</td>
                <td>{match.travelStatus}</td>
                <td>{match.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Travel() {
  const priority = soccerSchedule.filter((match) => match.priority);

  return (
    <div className="grid">
      <Card title="Priority Trips" className="span-6">
        <div className="list">
          {priority.map((match) => (
            <div className="list-row" key={`${match.date}-${match.opponent}`}>
              <strong>{formatDate(match.date)} · {match.opponent}</strong>
              <span>{match.location} · {match.travelStatus}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Travel Rules" className="span-6">
        <div className="list">
          <div className="list-row"><strong>90 days out</strong><span>Book hotel for priority weekends.</span></div>
          <div className="list-row"><strong>45 days out</strong><span>Flights, car, backup hotel.</span></div>
          <div className="list-row"><strong>14 days out</strong><span>Dinner reservation and tickets.</span></div>
          <div className="list-row"><strong>3 days out</strong><span>Weather, parking, packing, Andrew check-in.</span></div>
        </div>
      </Card>
    </div>
  );
}

function IthacaGuide() {
  return (
    <div className="grid">
      <Card title="Hotels" className="span-4">
        {hotels.map((place) => <div className="mini" key={place.name}><strong>{place.name}</strong><span>{place.notes}</span></div>)}
      </Card>
      <Card title="Restaurants" className="span-4">
        {restaurants.map((place) => <div className="mini" key={place.name}><strong>{place.name}</strong><span>{place.notes}</span></div>)}
      </Card>
      <Card title="Outdoor Activities" className="span-4">
        {outdoorActivities.map((place) => <div className="mini" key={place.name}><strong>{place.name}</strong><span>{place.drive} · {place.difficulty}</span></div>)}
      </Card>
    </div>
  );
}

function BucketList() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cornellBucket") || "{}");
    } catch {
      return {};
    }
  });

  function toggle(item) {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem("cornellBucket", JSON.stringify(next));
  }

  return (
    <Card title="Four-Year Cornell Bucket List">
      <div className="checklist">
        {bucketList.map((item) => (
          <label key={item}>
            <input type="checkbox" checked={Boolean(checked[item])} onChange={() => toggle(item)} />
            {item}
          </label>
        ))}
      </div>
    </Card>
  );
}

function KeyDates() {
  return (
    <Card title="Cornell Key Dates">
      <div className="list">
        {keyDates.map((item) => (
          <div className="list-row" key={`${item.date}-${item.title}`}>
            <strong>{formatDate(item.date)} · {item.title}</strong>
            <span>{item.type} · {item.notes}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");

  const title = useMemo(() => nav.find((item) => item.id === active)?.label || "Dashboard", [active]);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="seal">C</div>
          <div>
            <h1>Miles Family Cornell Portal</h1>
            <p>Private, unofficial family command center</p>
          </div>
        </div>

        <nav>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <p className="disclaimer">Cornell-inspired private portal. Not affiliated with or endorsed by Cornell University.</p>
      </aside>

      <main className="main">
        <header className="page-header">
          <div>
            <p className="kicker">Andrew Miles · Cornell Soccer · Class of 2030</p>
            <h1>{title}</h1>
          </div>
          <a className="github-link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub ready</a>
        </header>

        {active === "dashboard" && <Dashboard />}
        {active === "soccer" && <Soccer />}
        {active === "travel" && <Travel />}
        {active === "ithaca" && <IthacaGuide />}
        {active === "bucket" && <BucketList />}
        {active === "dates" && <KeyDates />}
      </main>
    </div>
  );
}