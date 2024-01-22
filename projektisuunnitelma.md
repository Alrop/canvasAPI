#658 JS Canvas API 

Tekijät: 
    Taija Mitronen (työtunnit: 27h)
        - Graafisten elementtien toteutus 
        - Hahmon liikuttaminen ja animointi 
        - HTML/CSS tyylitys 
        - Komponenttien classi rakenteet
.
    Aleksi Ropo (työtunnit: 38h)
        - Kentän piirtäminen ja Wall class 
        - Törmäyksen tunnistus 
        - Animation loopin rakenne 

Pelin idea:
    Tehdään sovellettu PacMan peli. Apina kerää banaaneita
    Apinan on tarkoitus hakea banaani syötäväksi satunnaisesta paikasta pelikenttältä. Kun banaani on haettu ja syöty, ilmestyy uusi banaani peliareenalle satunnaiseen paikkaan. 
    Peliin ilmestyy sitruunoita aina uuden banaanin ilmestyttyä. Mikäli apina syö tällaisen, peli loppuu

Suunnitelma:
    Peliareenan alustava koko on 800px * 400px.
    Banaani on staattinen elementti kuten myös sitruunat. Sitruunoita heitellään kentälle max. 5 kpl kerralla.
    Molemmat hedelmät heitetään peliareenalle Math.Randomin avulla

Loppufiilikset:
    Taija   
        - Vaativinta oli hahmon liikkuvuuden tekeminen ja se tulee vieläkin viiveellä. Tälle en saanut nopeampaa reagointia vaikka se olisi ollut EHKÄ mahdollista SetIntervallin kautta. 
        - Classien käyttö oli uutta jossa Aleksi auttoi oppimaan.  
. 
    Aleksi
        -Classeihin tarkempi tutustuminen toi uutta näkökulmaa ohjelmiston lokeroimiseen, joskin sen mukana tuli uusia haasteita this.objektin ja ulkoisten funktion käytön aiheuttamassa referenssin katkeamisessa.
        -Git versionhallinta aiheutti huomattavaa päänvaivaa
