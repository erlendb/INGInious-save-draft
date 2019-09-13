# Automatisk lagre kladd i INGInious (Algdat-øvingssystemet)

Chrome-utvidelse som automatisk lagrer svarene i INGInious. Neste gang du logger deg på for å fullføre øvingen, så fortsetter du der du slapp. Svarene lagres **ikke** på brukeren din, men i nettleseren din. Det betyr at du må bruke samme datamaskin med samme nettleser for å finne svarene dine igjen.

Det enkleste er å installere den fra Chrome nettmarked: https://chrome.google.com/webstore/detail/lagre-kladd-i-inginious/bilkdbfjjbggekiddbkblbaehjfiocic?hl=no

Obs: Denne greia er under utvikling. Ikke forvent at alt er feilfritt.

## Hvordan funker utvidelsen?

Hver gang du endrer på en input i øvingen, så lagrer utvidelsen det nye svaret i Chrome sin "local storage".

Når du åpner en øving, så sjekker utvidelsen om alle inputer er tomme. Hvis alt er tomt, så antar den at du ønsker å hente fram kladden for å fortsette der du slapp - så da henter den fram svarene som den lagret sist.

## Bugs og todo

* Itererer over den radioknappen man trykker en gang mer enn nødvendig. Kanskje droppe iterasjon og løse det annerledes
* Tar enn så lenge bare hensyn til sjekkbokser og radioknapper
* Lagrer ikke tekstsvar (kodeøvinger f.eks.)
* Gjøre om fra local storage til sync

## Hvordan installere fra kildekode

Det enkleste er å installere utvidelsen fra Chrome nettmarked (aka Chrome webstore).

For å laste inn utvidelsen fra kildekoden må du gjøre følgende: Åpne chrome://extensions i Chrome. Aktiver "Utviklermodus". Trykk på last inn upakket utvidelse. Naviger til Lagre-kladd-inginious/src/ og last inn derfra.

### Enkel pakking av crx/zip-fil fra kildekode

Kjør `./create`. Da zippes innholder i `src/`, og zipfila lagres i `crx/utvidelsenavn-versjon.zip`. Versjonsnummeret hentes fra `src/manifest.json`. Du blir spurt før skriptet eventuelt skriver over noe.
