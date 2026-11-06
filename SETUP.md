# Storan Dokumen: Microsoft sign-in, OneDrive storage, GitHub Pages

Everyone signs in with their own **syayasan.edu.bn** Microsoft account. All documents, users and the
audit log are kept in one folder in the OneDrive of the owner account (`ownerEmail` in `config.js`).
There is no server and no database: the website is just these files on GitHub Pages.

## Files in this package

| File | What it is |
|---|---|
| `index.html` | The whole system. You do not need to edit it. |
| `config.js` | **The only file you edit.** Client ID, owner, admins. |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | Lets phones install it as an app with the YSHHB logo. |
| `vendor/` folder | The Microsoft sign-in library (MSAL 2.38.3) and the Excel library (SheetJS 0.20.3), kept in your own repository so the site does not load them from a CDN. **Upload this folder too.** |

## 1. Microsoft Entra app registration (once)

You can **reuse the app registration you made for the Pembelian system**: it already has the right permissions.

1. Go to **entra.microsoft.com** > **App registrations** > open your existing app (or **New registration**:
   name `Storan Dokumen`, account type **this organizational directory only**).
2. **Authentication** > **Add a platform** > **Single-page application (SPA)** > Redirect URI = the exact web address of
   this site, ending with `/`, for example `https://dokumen.syayasan.edu.bn/`
   (or `https://YOUR-GITHUB-NAME.github.io/storan-dokumen/`). Add it as an *extra* URI if you reuse the app.
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
2. **Add file > Upload files**: upload `index.html`, `config.js`, `manifest.webmanifest`, `sw.js`, the four `icon-*.png`
   and the whole **`vendor`** folder (drag the folder in; upload the files themselves, not the .zip). Commit.
3. **Settings > Pages** > Deploy from branch **main** / **(root)** > Save.
4. Optional custom domain: in Pages set `dokumen.syayasan.edu.bn`, and ask IT to add a **CNAME** record pointing to
   `YOUR-GITHUB-NAME.github.io`. Tick **Enforce HTTPS**.
5. Make sure the address people open is exactly the Redirect URI from step 1.2.

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

Everything below works with one thumb. Install the site on the home screen first (Chrome menu > **Install app**, or Safari **Share > Add to Home Screen**).

- **Urus** (bottom bar, admins only) has four tabs: **Pengguna** (users), **Aktiviti** (audit log), **Storan** (OneDrive) and **Keselamatan** (security check).
- **Change someone's role in one tap**: in **Pengguna**, tap **Pentadbir**, **Penyunting** or **Pemerhati** on their card. Their OneDrive access updates by itself. **Buang** removes them.
- **Add a person**: **＋ Tambah**, type a name or email, pick them, choose a role, **Tambah pengguna**.
- **⋮ on any document** opens a menu: open, download, favourite, **Buka di OneDrive / aplikasi Office** (edit in the Word or Excel app on your phone), edit details, select several, delete.
- **Select several**: press and hold a document (or tap the tick button above the list), tick more, then change the category, add tags or delete them all at once.
- **Delete has Undo**: nothing is removed for 8 seconds. Tap **Buat asal** to bring it back.
- **Pull the page down** from the top to load the latest changes.

## Handy tips

- **Drag files anywhere** on the page to upload them (Admins and Editors). Press **u** to open the upload window.
- **Star (★) a document** to find it again fast. Tap the ★ button above the list to show only favourites.
  Favourites are saved on that phone or computer, for that person.
- **"Baharu" badge**: documents other people added since you last looked. It goes away once you open the document.
- **Previous / next arrows** (or the keyboard arrow keys, or a swipe on a phone) move between documents while reading.
- **Refresh button** (circular arrow) loads the latest changes straight away. Otherwise they appear within about 30 seconds.

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
- **Sign-in and Excel libraries are kept in your repository** (`vendor/`), so a CDN cannot tamper with the code that handles your
  Microsoft sign-in. The other helper libraries (PDF reader, Word preview, OCR) still load from jsDelivr and cdnjs at fixed
  versions, restricted by the policy above but not hash-locked. They never see your sign-in. They can be copied into `vendor/` later.
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
| Sign-in screen never appears, or Excel preview does nothing | The `vendor` folder was not uploaded to GitHub (or the files were renamed). Upload it again exactly as in the package. |
