/* ==========================================================================
   Storan Dokumen: tetapan / settings
   Edit this file only. You do not need to touch index.html.
   ========================================================================== */
window.APP_CONFIG = {

  // 1. Application (client) ID from Microsoft Entra (App registrations > Overview).
  //    You can reuse the same app registration as the Pembelian system.
  clientId: "598ea952-e9df-4684-a109-85832dc34e59",

  // 2. Your Microsoft 365 tenant. The school's domain works. A tenant ID (GUID) also works.
  tenant: "syayasan.edu.bn",

  // 3. The account whose OneDrive stores the documents. Always an admin.
  ownerEmail: "it.helpdesk@syayasan.edu.bn",

  // 4. Other people who are always admins (they can add and remove users from the website).
  //    They are given access to the OneDrive folder automatically when the owner signs in.
  admins: ["zulfa.zaini@syayasan.edu.bn"],

  // 5. Name of the OneDrive folder that holds everything.
  //    It is created automatically the first time the owner signs in.
  folderName: "Storan Dokumen SYSHHB",

  // 6. Recommended. Fill this in AFTER the owner has signed in once:
  //    open the app > tap your name > "Storan OneDrive" > "Tetapan untuk config.js" > Copy.
  //    It lets everyone connect straight to the right folder.
  storage: { driveId: "", itemId: "" },

  // ----- Security settings (the defaults are the safe choice) -----

  // Sign out automatically after this many minutes without any activity. 0 = never.
  idleMinutes: 30,

  // false (safer): you sign in again after closing the browser or the app.
  // true: this device remembers you. Only use this on a personal phone or computer.
  rememberSignIn: false,

  // Content Security Policy: blocks scripts from unknown sites. Leave "on".
  // Only set "off" for a few minutes to find out if it is blocking something, then tell the developer.
  csp: "on"

  // Optional: redirectUri: "https://dokumen.syayasan.edu.bn/"   (leave out to use this page's address)
};
