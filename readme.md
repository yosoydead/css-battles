Link cont: https://cssbattle.dev/player/yosoydead

Fiecare exercițiu de pe site e făcut pentru o pagina de 400x300. Soluțiile o să fie strict pentru măsurătorile astea.

Numele folder-ului principal e exact același cu cel întâlnit pe site. Numărul folderelor mici coincide cu numărul de pe site. (poate ar trebui să fac un script de link spre challenge)

- [x] Fă un script prin care să generezi automat un nou folder cu html și css mulate pentru soluție.

## Instrucțiuni
- ```git clone```
- ```npm install```
  - rulează un post install script să genereze cache-ul cu css battles preexistente ```createCache```

## Adaugă o nouă ediție
- ```npm run newEdition -- <numele folderului dorit>```
  - evită nume complicate, cu caractere speciale, multe spații, etc
  - o să adauge un nou folder în ```src/battles``` cu numele dat de forma: ```123. <nume>```

## Adaugă un nou css battle
- ```npm run newBattle```
  - o să genereze automat un folder nou în **ultimul folder înregistrat ca ediție** din cache

## Pentru generarea manuală a cache-ului
- ```npm run createCache```