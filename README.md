# GRIDS --- Google-linked Report & Input Dashboard Studio

**Configure. Submit. Report. Sync. For many forms, in one app.**

GRIDS lets you fill Google Forms and see reports from the linked Google Sheets. Each form you use is called an **Application**, and GRIDS remembers every Application's settings separately, so you can switch between them with one tap.

## How GRIDS works

When GRIDS opens you see the **Welcome screen**. Pick an Application from the list and press **Open**. GRIDS loads that Application's own settings and shows only its data. The Application name at the top of every screen lets you switch to another one at any time, and the moon/sun button next to it changes the theme (dark is the default).

-   **Home** --- Fill in the fields and submit an entry to the Google Form.
-   **Report** --- Read the linked Google Sheet and show the report you configured.
-   **Settings** --- Links, form fields, default values, report layout, sync and backup.
-   **About** --- Version, installation and help.

## First-time setup of an Application

1.  On the Welcome screen choose **+ New**, type a name and open it, or open an Application that has no settings yet.
2.  If you were given a settings file, choose **Import a settings file (.json)** and select it. Everything is filled in for you.
3.  Otherwise choose **Start from scratch** and fill in Settings → Links and Settings → Form fields.

After this first time, just pick the Application and press **Open**. Its settings come back automatically.

## Keeping your settings safe

GRIDS gives you three safety nets. You do not need all of them, but one backup file is a good habit.

1.  **Last working copy** --- GRIDS quietly keeps the last known working settings of each Application on this device. If something breaks, go to Settings → Sync → **Restore last working copy**.
2.  **Backup files** --- Settings → Sync → **Export .json** saves one Application. On the Welcome screen **Backup all apps** saves every Application in one file, and **Restore all apps** brings them back.
3.  **Google Drive** --- After connecting Google, **Sync now** keeps a copy of the Application's settings in your own Google Drive. **Restore Drive → local** brings it back.

If you clear the browser's site data or uninstall the app, the copies on the device are removed. Your backup file and Google Drive copy are what you restore from.

## Google Form submission

GRIDS sends your entry straight to the Google Form's response address using the `entry.NNNNNNN` IDs configured for each field. The Google Form is not read. Nothing is stored by GRIDS except your settings.

## Report

The Report reads the linked Google Sheet only when you press **Fetch Sheet data**. Choose rows, columns, value, aggregation and filters in Settings → Report. Google sign-in is needed for this step only.

## Privacy

Settings stay in your browser. Google is contacted only for features that need it: reading the Sheet and the optional Drive sync. Passwords and tokens are never written to backup files. See the Privacy page and Terms page for details.

## Installing GRIDS

Open the hosted address in Chrome (or another supported browser) and choose **Install app** or **Add to Home screen**. GRIDS works offline for filling the screens; Google features need the internet.

## Files to host

Put these files together in one folder on your website: `index.html`, `manifest.json`, `service-worker.js`, `pwa-192x192.png`, `pwa-512x512.png`, `pwa-maskable-512x512.png`, `README.html`, `privacy.html` and `terms.html`. The theme and Google sync code are already inside `index.html`.

## Google OAuth setup

A new deployment needs its own OAuth Client ID: create a Web application client in Google Cloud Console, add your site address as an authorized JavaScript origin, and replace the Client ID near the top of `index.html` (the line with `GRID_GOOGLE_CLIENT_ID`).

## Version

**GRIDS 1.0.1**

Google-linked Report & Input Dashboard Studio
