#658 JS Canvas API 

Tekijät: 
    Taija Mitronen, Aleksi Ropo

Pelin idea:
    Tehdään sovellettu PacMan peli. Apina kerää banaaneita
    Apinan on tarkoitus hakea banaani syötäväksi satunnaisesta paikasta pelikenttältä. Kun banaani on haettu ja syöty, ilmestyy uusi banaani peliareenalle satunnaiseen paikkaan. 
    Peliin ilmestyy sitruunoita aina uuden banaanin ilmestyttyä. Mikäli apina syö tällaisen, peli loppuu
    Mikäli osaaminen/aika riittää, tehdään pelikentälle myös Botti joka ilmestyy tietyn väliajoin, kestää tietyn ajan ja likkuu tietyn liikkeen.

Suunnitelma:
    Peliareenan alustava koko on 800px * 400px.
    Banaani on staattinen elementti kuten myös sitruunat. Sitruunoita heitellään kentälle max. 5 kpl kerralla.
    Molemmat hedelmät heitetään peliareenalle Math.Randomin avulla