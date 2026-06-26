# Miles Family Cornell Portal

A private, unofficial Cornell family portal for tracking Andrew's Cornell years: soccer schedule, family travel, Ithaca favorites, outdoor activities, academic anchors, and bucket-list memories.

## How to run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in Terminal.

## How to update content

Most updates happen in `/src/data/`.

- `soccerSchedule.js` — matches, kickoff times, venue, travel status
- `keyDates.js` — move-in, orientation, Family Weekend, academic anchors
- `places.js` — hotels, restaurants, outdoor activities
- `bucketList.js` — four-year Cornell experiences

Edit those files, save, commit, and push to GitHub.

## Suggested deployment

Use Vercel.

1. Create a GitHub repo.
2. Push this project.
3. Go to Vercel.
4. Import the GitHub repo.
5. Deploy.
6. Every GitHub update automatically redeploys the site.

## Future Google Sheets backend

This repo is intentionally data-file based first because it is simpler and stable. A future version can replace `/src/data/*` with a Google Sheets API fetch layer.