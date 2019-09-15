# Automatisk lagre kladd i INGInious (Algdat-øvingssystemet)

Du kan installere utvidelsen fra Chrome nettmarked: https://chrome.google.com/webstore/detail/lagre-kladd-i-inginious/bilkdbfjjbggekiddbkblbaehjfiocic?hl=no

Dette er en Chrome-utvidelse som automatisk lagrer svarene dine i INGInious. Neste gang du logger deg på for å fullføre øvingen, så fortsetter du der du slapp. Svarene lagres ikke på INGInious-brukeren din, men lokalt i nettleseren. Det betyr at du må bruke samme datamaskin med samme nettleser for å finne svarene dine igjen.

## Hvordan funker utvidelsen?

Hver gang du endrer på en input i øvingen, så lagrer utvidelsen det nye svaret i Chrome sin "local storage".

Når du åpner en øving, så sjekker utvidelsen om alle inputer er tomme. Hvis alt er tomt, så antar den at du ønsker å hente fram kladden for å fortsette der du slapp &mdash; så da henter den fram svarene som den lagret sist.

## Bugs og todo

* Tar enn så lenge bare hensyn til sjekkbokser og radioknapper
* Gjøre om fra local storage til sync

## Hvordan installere fra kildekode

Det enkleste er å installere utvidelsen fra Chrome nettmarked.

For å laste inn utvidelsen fra kildekoden må du gjøre følgende: Åpne *chrome://extensions* i Chrome. Aktiver "Developer mode". Trykk på "Load unpacked". Naviger til *Lagre-kladd-inginious/src/* og last inn derfra.

### Enkel pakking av crx/zip-fil fra kildekode

Kjør `./create`. Da zippes innholdet i *src/*, og zipfila lagres som *crx/utvidelsenavn-versjon.zip*. Versjonsnummeret hentes fra *src/manifest.json*. Du blir spurt før skriptet eventuelt skriver over noe.
