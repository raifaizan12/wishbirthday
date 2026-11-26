/* ============================================================
   REMOTE CONTROL SETTINGS  (sirf ek dafa bharna hai)
   Steps ke liye ADMIN-SETUP.txt dekho.
   dbUrl khali ho to remote control band rehta hai aur site bilkul
   pehle jaisi chalti hai.
   ============================================================ */
window.CTL_CONFIG = {
  // Firebase Realtime Database ka URL, e.g. "https://myproject-default-rtdb.firebaseio.com"
  dbUrl: "https://console.firebase.google.com/project/birthdaywish-6774c/database/birthdaywish-6774c-default-rtdb/data",
  // Firebase "cd $HOME\Desktop\wishbirthday; git pull; $z = Get-ChildItem "$HOME\Downloads\wishbirthday-main*.zip" | Sort-Object LastWriteTime -Descending | Select-Object -First 1; Expand-Archive $z.FullName "$HOME\Downloads\wb_tmp" -Force; Copy-Item "$HOME\Downloads\wb_tmp\wishbirthday-main\*" . -Recurse -Force; Start-Process notepad ctl-config.js -Wait; git add -A; git commit -m "Add admin panel with live remote lock"; git push origin mainssss" (Project settings > General). Sirf admin login ke liye.
  apiKey: "BKq4dBxUwec19X_5kx_xYtTISo9vFzTcdIinoCyfG4zYsm8F0oFouYQ7Dd0vuWOYX42FAoB2KxpPiICTBRCtCSM",
  // Lock screen par "Contact developer" button is WhatsApp number par jayega (bina +)
  devWhatsapp: "923311065822"
};

