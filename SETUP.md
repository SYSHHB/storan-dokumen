# Storan Dokumen: Microsoft sign-in, OneDrive storage, GitHub Pages

Everyone signs in with their own **syayasan.edu.bn** Microsoft account. All documents, users and the
audit log are kept in one folder in the OneDrive of the owner account (`ownerEmail` in `config.js`).
There is no server and no database: the website is just these files on GitHub Pages.

## Files in this package

| File | What it is |
|---|---|
| `index.html` | The whole system. You do not need to edit it. |
| `config.js` | **The only file you edit.** Client ID, owner, admins. |
| `CNAME` | Tells GitHub Pages to serve the site on `document.syayasan.edu.bn`. Upload it too. |
| `manifest.webmanifest`, `sw.js`, `icon-*.png`, `emblem-192.png` | Lets phones install it as an app with the YSHHB logo. |
| `version.txt` | One line with the version number. When it differs from the version inside `index.html`, the site refreshes itself once, so phones never get stuck on an old copy. **Upload it together with `index.html`.** |
| `xlsx.full.min.js`, `LIBRARIES.txt` | The Excel library (SheetJS 0.20.3) and a note about the libraries. The Microsoft sign-in library is already built into `index.html`. |

## 1. Microsoft Entra app registration (once)

You can **reuse the app registration you made for the Pembelian system**: it already has the right permissions.

1. Go to **entra.microsoft.com** > **App registrations** > open your existing app (or **New registration**:
   name `Storan Dokumen`, account type **this organizational directory only**).
2. **Authentication** > **Add a platform** > **Single-page application (SPA)** > Redirect URI = the exact web address of
   this site, ending with `/`: **`https://document.syayasan.edu.bn/`**. Add it as an *extra* URI if you reuse the app.
   (While testing you can also add the `github.io` address, then remove it.)
3. **API permissions** > Microsoft Graph > **Delegated**: `User.Read`, `User.ReadBasic.All`, `Files.ReadWrite.All`,
   then **Grant admin consent**. (Already done if you reuse the Pembelian app.)
4. **Overview** > copy the **Application (client) ID**.

## 2. Edit `config.js`

- `clientId`: paste the Application (client) ID from step 1.4.
- `ownerEmail`: the account whose OneDrive stores everything. **Check this address is exactly right.**
- `admins`: people who are always admins (pre-filled with zulfa.zaini@syayasan.edu.bn).
- Leave `storage` empty for now (step 5).

## 3. Put it on GitHub Pages

1. On github.com create a repository, for example `storan-dokumen`.
2. **Add file > Upload files**: upload **all the files in the package** (no folders to create): `index.html`, `config.js`, `CNAME`,
   `manifest.webmanifest`, `sw.js`, `version.txt`, `xlsx.full.min.js`, `LIBRARIES.txt` and the four `icon-*.png` (the files themselves, not the .zip). Commit.
3. **Settings > Pages** > Deploy from branch **main** / **(root)** > Save.
4. **Your address `document.syayasan.edu.bn`** (the `CNAME` file in this package already contains it):
   - In **Settings > Pages** > **Custom domain**, type `document.syayasan.edu.bn` and Save.
   - Ask whoever manages the `syayasan.edu.bn` DNS to add **one record**: type **CNAME**, name **`document`**, value
     **`syshhb.github.io`** (just the name, no repository). Do not use A records for a subdomain.
     If the DNS is on Cloudflare, set it to **DNS only** (grey cloud).
   - Wait until Pages says **DNS check successful** (can take up to an hour), then tick **Enforce HTTPS**.
   - Recommended: in your GitHub **account** settings > **Pages** > **Add a domain**, verify `syayasan.edu.bn` with the TXT record GitHub shows.
     This stops anyone else from claiming your subdomain.
5. The address people open must be exactly the Redirect URI from step 1.2 (`https://document.syayasan.edu.bn/`). If someone opens
   the old `github.io` address, the site sends them to the school address automatically (`canonicalHost` in `config.js`).

## 4. First sign-in (do this once)

1. Open the site and sign in as the **owner** account (`it.helpdesk@syayasan.edu.bn`). The OneDrive folder
   **Storan Dokumen SYSHHB** is created, and the admins in `config.js` (Zulfa) are **given access automatically**.
2. Sign in as the admin (`zulfa.zaini@syayasan.edu.bn`), tap **Urus** (top of the page, or the bottom bar on a phone) > **Pengguna** > **＋ Tambah**:
   type a name or email, choose **Penyunting** or **Pemerhati**, press **Tambah pengguna**.
   The person is added **and shared in OneDrive straight away**. You never open OneDrive.
3. Removing a person (**Buang**) takes their OneDrive access back. Changing their role updates it.

## 5. Let everyone connect straight to the folder (recommended)

Still signed in as admin: tap **Urus** > **Storan** > **Tetapan untuk config.js** > **Salin**.
Paste the line into `config.js` on GitHub (replace the empty `storage: { ... }`) and commit.

## Managing from your phone

Everything below works with one thumb. Install the site on the home screen first (Chrome menu > **Install app**, or Safari **Share > Add to Home Screen**). The app is called **SYSHHB IT Documents**. If you installed it earlier under another name, remove the old icon and install it again to see the new name.

- **Urus** (bottom bar, admins only) has four tabs: **Pengguna** (users), **Aktiviti** (audit log), **Storan** (OneDrive) and **Keselamatan** (security check).
- **Change someone's role in one tap**: in **Pengguna**, tap **Pentadbir**, **Penyunting** or **Pemerhati** on their card. Their OneDrive access updates by itself. **Buang** removes them.
- **Add a person**: **＋ Tambah**, type a name or email, pick them, choose a role, **Tambah pengguna**.
- **⋮ on any document** opens a menu: open, download, favourite, **Buka di OneDrive / aplikasi Office** (edit in the Word or Excel app on your phone), edit details, select several, delete.
- **Select several**: press and hold a document (or tap the tick button above the list), tick more, then change the category, add tags or delete them all at once.
- **Delete has Undo**: nothing is removed for 8 seconds. Tap **Buat asal** to bring it back.
- **View PDFs right in the app**: open a PDF and it is drawn page by page, fitted to your screen. Scroll to read, tap **−** / **+** or pinch with two fingers to zoom, and use the page / width buttons to fit. The page number is shown above (for example **Hal. 2 / 5**). No download needed. On a computer the browser's own PDF viewer is used.
- **Kategori dropdown**: on a phone the category buttons are replaced by one dropdown. Tap it to see all categories with how many documents each has, choose one, and the list is filtered. With many categories there is a search box. Tap it again and choose **Semua kategori** to see everything.
- **Kategori**: when you upload or edit, tap **DO**, **Invoice**, **Minit**, **Memo** or **Borang Penyerahan**, or type a new category. New categories you type appear as buttons from then on. If you choose nothing, the category is **Lain-lain**.
- **Pull the page down** from the top to load the latest changes. A thin green-yellow bar at the top shows while it loads.
- **Tapis** (filter) opens one tidy panel for year, tag, uploader and sort, instead of four drop-downs. The number on the button shows how many filters are on.
- **Loading screen**: every time the page is opened or refreshed you see the logo and three steps (Sign-in, OneDrive, Documents) until your documents are ready.
- **Summary cards** at the top all fit on one screen, with nothing to slide.

## Change details in bulk (Excel)

Admins and Editors can change many documents at once: tap **Eksport / Import** (next to **Tapis** on a phone, or the arrows button above the list on a computer).

1. **Eksport** > **Excel** (or CSV). You get all documents, or only the ones currently shown.
2. Open the file and change **Tajuk** (the name shown in the app), **Kategori**, **Tarikh dokumen**, **No. rujukan**, **Tag** or **Catatan**. Do **not** change or delete the **ID** column.
   Dates can be written `2026-11-06` or `06/11/2026` (day/month/year). Empty a cell to remove its value.
3. **Import** > choose the file. The app first shows a **preview** of every change (old value crossed out, new value in green) and any warnings (a bad date, an empty title, an unknown ID). Nothing changes until you press **Gunakan perubahan**.
4. Made a mistake? Press **Buat asal** (Undo) on the final screen. Keep the exported file as your own backup too.

The file name on OneDrive is not renamed: **Tajuk** is the name people see in the app. Every import and export is written in the audit log.

## Who can see and delete what

- **Everyone who can sign in sees every document** that anyone uploaded, and can search inside them, open them and download them (Admin, Editor and Viewer alike). New uploads appear on other people's screens within about 15 seconds, or straight away after a refresh.
- **Deleting**: an Editor can delete only the documents **they** uploaded. Only an Admin can delete other people's documents. The Delete button is hidden on other people's files, the file's screen says who can delete it, and the app refuses a delete from anyone else even if it is tried another way.
- **Editing details** (title, category, date and so on) is open to Admins and Editors for every document. Viewers cannot change anything.
- If someone cannot see another person's documents, ask them to open **Saya > Semak akses saya** and send you the report.

## Handy tips

- **Drag files anywhere** on the page to upload them (Admins and Editors). Press **u** to open the upload window.
- **Star (★) a document** to find it again fast. Tap the ★ button above the list to show only favourites.
  Favourites are saved on that phone or computer, for that person.
- **"Baharu" badge**: documents other people added since you last looked. It goes away once you open the document.
- **Previous / next arrows** (or the keyboard arrow keys, or a swipe on a phone) move between documents while reading.
- **Refresh button** (circular arrow) loads the latest changes straight away. Otherwise they appear within about 30 seconds.

## Launch screen and icons

When you open the installed app, Android first shows its **own** launch screen (the round emblem on the dark green), then the app's loading screen takes over.
The emblem is in the same place and size on both, so it looks like one smooth start. Android builds its launch screen from the icon files when the app is installed, so a phone that installed the app earlier keeps the old one (a white square) until it is reinstalled.

To see the new launch screen:
1. Upload `index.html`, `version.txt`, `manifest.webmanifest` and the icon files (`emblem-192.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `icon-180.png`) to GitHub.
2. On the phone, **remove the app icon** (press and hold the icon > **Uninstall** / **Remove**).
3. Open `https://document.syayasan.edu.bn/` in Chrome, sign in, then Chrome menu > **Install app**.

(Android may also update an installed app by itself after a day or two, but reinstalling is immediate.)

## Updating the site (and checking you have the latest)

1. Upload the new `index.html` **and `version.txt`** (and any other changed file) to GitHub.
2. In GitHub, open the **Actions** tab and wait for **pages build and deployment** to show a green tick (about a minute).
3. Open `https://document.syayasan.edu.bn/version.txt` on the phone. It shows the version number (for example `2026-11-06.4`).
4. In the app, tap **Saya**: the version is shown at the bottom. If it is not the same number, tap **Kemas kini aplikasi** (Update app).

## Roles

| Role | Can do |
|---|---|
| **Pentadbir** (Admin) | Everything: upload, edit, delete any document, manage users, audit log. |
| **Penyunting** (Editor) | Upload, edit details and file contents, delete **own** uploads. Sees and downloads everything. |
| **Pemerhati** (Viewer) | Search, view and download only. OneDrive itself is read-only for them. |

## Where things are stored (OneDrive folder `Storan Dokumen SYSHHB`)

`docs/<id>/<file>` the documents · `_system/index.json` the list · `_system/text/` text inside files (for search) ·
`_system/users.json` users and roles · `audit/<year-month>/<user>.json` the audit log.
Changes by other people appear within about 30 seconds.

## Good to know

- **Sharing is automatic.** Admins can change everything. Editors can change documents but **cannot change the user list or
  settings** (that folder is admin-only in OneDrive). Viewers can only read. Everyone can write to the `audit` sub-folder so
  every person's activity is logged. The **Selaraskan perkongsian OneDrive** button (in the users panel) re-checks everyone.
  On an existing install, the first admin sign-in moves the user list to the admin-only folder and tightens access.
- **Each person's OneDrive status** is shown under their name in the users panel.
- **Audit log** (admins only): sign-ins, opens, downloads, uploads, edits, deletes, user changes. Filter, export to CSV, clear.
- **Reading scanned PDFs and photos (OCR)** runs inside the browser (Tesseract, English + Malay). It needs internet
  access to `cdn.jsdelivr.net` the first time, and a 40-page scan can take a few minutes.
- **File size**: up to 100 MB per file. Space comes from the owner's OneDrive (usually 1 TB).
- Documents saved in the Claude version are **not** moved over automatically.
- Install on a phone: Chrome menu > **Install app** (Android) or Safari **Share > Add to Home Screen** (iPhone).
- Changes by other people appear within about 30 seconds.

## Security

**Built in (nothing for you to do)**

- **Microsoft sign-in only.** The site never sees passwords. Anyone who is not added by an admin sees "Tiada akses".
- **OneDrive enforces the roles**: Viewers are read-only, Editors cannot touch the user list or settings, only Admins can change roles.
- **Content Security Policy**: only Microsoft, jsDelivr, cdnjs, SheetJS and Google Fonts may run scripts, and no other website can
  receive data from the page. The page cannot be shown inside another site, and https is enforced.
- **Sessions**: sign-in lasts only until the browser is closed (default) and you are signed out after **30 idle minutes**
  (`idleMinutes`). On sign-out the documents are cleared from the screen and the local search copy is deleted.
- **Files are checked by content, not just name** (a web page renamed `.pdf` is refused). Previews use fixed safe types, Word and
  Excel previews are cleaned, and the audit CSV export neutralises spreadsheet formulas (`=cmd...`).
- **Everything read from OneDrive is validated** (document list, users, audit), so a tampered file cannot inject code, escape its
  folder or invent an admin.
- **Excel library is SheetJS 0.20.3, hosted in your repository.** The older version had known security flaws (CVE-2023-30533, CVE-2024-22363).

**Please do these (about 10 minutes, in Microsoft and GitHub: the website cannot do them for you)**

1. **Microsoft Entra** > Enterprise applications > this app > **Properties** > **Assignment required? = Yes**, then **Users and groups**
   > add the staff group. Then only assigned people can even get a sign-in token.
2. **Conditional Access**: require **MFA** for this app.
3. **GitHub**: turn on **2FA** for everyone with access to the repository, protect the `main` branch (Settings > Branches) and keep
   collaborators to a minimum. Whoever can change the repository can change the site.
4. **SharePoint admin centre > Sharing**: set OneDrive sharing to **Only people in your organization**, so nobody can create public links.
5. Remove redirect URIs you no longer use, and look at the Entra **sign-in logs** now and then.

**Honest limits**

- There is no server, so **editors are trusted with documents and the audit log**: someone with edit rights could change or
  delete audit files directly in OneDrive. Export the audit log to CSV regularly if you need a record.
- GitHub Pages cannot send security headers (such as HSTS). A script keeps the page out of other sites' frames. For stronger
  protection, put the site behind Cloudflare.
- **The Microsoft sign-in library is built into `index.html`** and the Excel library is the file `xlsx.full.min.js`, so a CDN cannot tamper with the code that handles your
  Microsoft sign-in. The other helper libraries (PDF reader, Word preview, OCR) still load from jsDelivr and cdnjs at fixed
  versions, restricted by the policy above but not hash-locked. They never see your sign-in.
- The Claude-hosted version is a separate copy and still uses the older Excel library (Claude's page only allows cdnjs).
  Use this GitHub version for sensitive spreadsheets.

## Problems

| Message | Fix |
|---|---|
| `AADSTS50011` / "Redirect URI" | The site address does not match step 1.2 exactly (check `https`, trailing `/`, `www`). |
| `AADSTS65001` / consent | Click **Grant admin consent** in step 1.3. |
| `AADSTS700016` / client ID wrong | Check `clientId` and `tenant` in `config.js`. |
| "Belum ada akses ke storan" | The person has not been added yet: an admin adds them under **Tambah pengguna**. On a brand-new install the owner must sign in once first. If they were added and still see this, an admin presses **Selaraskan perkongsian OneDrive**, or fills in `storage` (step 5). |
| After adding someone: "belum dikongsi di OneDrive" | The admin is not allowed to share the folder. Ask the owner to sign in once: the system shares everyone automatically. (Check that SharePoint/OneDrive sharing in the Microsoft 365 admin centre allows sharing with people in the organisation, and that editors may share.) |
| "Tiada akses" | They signed in but an admin has not added them under **Tambah pengguna**. |
| Viewer cannot upload | Correct: Viewers are read-only. Change their role to **Penyunting**. |
| OCR says the engine could not load | No internet access to `cdn.jsdelivr.net`. Try again on another network. |
| Something stops working, or a feature does nothing | Tap **Urus** > **Keselamatan**: it lists anything the policy blocked. To confirm, set `csp: "off"` in `config.js` for a few minutes, then set it back and tell the developer the blocked address. |
| "Sesi tamat" | You were signed out after 30 idle minutes. Sign in again. Change `idleMinutes` in `config.js` if needed. |
| An editor cannot change roles | By design. Only admins can (the user list is admin-only in OneDrive). |
| Sign-in screen never appears, or shows "library couldn't be loaded" | The old `index.html` is still on GitHub. Upload the latest `index.html`, wait a minute for Pages to publish, then reload (pull down, or clear the site data). |
| I cannot add a user, or something will not save | Tap **Urus** > **Storan** > **Semak sambungan OneDrive**. It lists what OneDrive is blocking (use **Salin laporan** to copy it). If the admin-only folder is refused, the user list is kept in `_system/users.json` instead and adding users still works. Then press **Selaraskan perkongsian OneDrive**, or ask the owner (it.helpdesk) to sign in once. |
| A user I added is missing after a refresh | Newer versions confirm the save by reading the list back from OneDrive, and remember a new user on that phone for a few minutes. If you see “OneDrive hasn't confirmed the save yet”, wait a minute and refresh. If the Users tab says the list could not be loaded, press **Try again** (**Cuba lagi**). Still missing? Open **Urus > Storan > Semak sambungan OneDrive** and send the report. |
| An old folder called `_admin` is in the OneDrive folder | An earlier version used it, but SharePoint reserves that name, so it never worked. The app now keeps the admin-only user list in a folder called `pentadbir`. Users saved in the old places are picked up automatically and moved on the next save. You can delete the old `_admin` folder. |
| A PDF shows a message instead of the pages | The PDF reader loads from the internet the first time (cdnjs.cloudflare.com). Check the connection, or tap **Buka di OneDrive** / **Muat turun** on that screen. |
