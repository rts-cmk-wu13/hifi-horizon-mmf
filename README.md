

#Link til hjemmesiden

## https://hifi-mmf.netlify.app/














# **Projektopgave HI-FI Horizon**

## Om opgaven
Denne opgave omhandler opsætning, navigation og hentning af data. Læs hele opgavebeskrivelsen grundigt igennem inden I stiller spørgsmål.

## Opgavebeskrivelse

I skal fremstille en webapplikation til en HI-FI webbutik, som præsenterer butikkens produkter inddelt efter kategori eller producent. Brugeren af sitet skal nemt og overskueligt kunne finde rundt i de forskellige produkter og kunne fremsøge produkter vha. søgeord. Der er **primært** tale om præsentation af produkterne. I kan lave et simuleret check-ud flow som en ekstraopgave.

Opgaven varer 2 uger og omhandler både planlægningen og produktionen af client-side produktet. Opgaven skal planlægges, der skal udarbejdes designanalyse (identifikation af komponenter/moduler). Der skal udarbejdes simple user-stories med accept-kriterier til komponenter/moduler (brug evt. AI). 

I skal samarbejde om projektet digitalt (eksempelvis ved hjælp af GitHub Projects). Der er mulihged for, at I undervejs i processen også vedligeholder et fysisk kanban-board, som kan bruges fx. ved de daglige scrum-møder.

Det arbejde der forventes udført når projektet er slut, er en funktionel offentlig tilgængelig client-side deployet til fx. Netlify, som henter data og billeder fra en (eller flere) JSON-datakilde(r). Applikationen skal være sat op, så den matcher det udleverede design.

Et HI-FI produkt består af et navn, en beskrivelse, en pris, et billede, samt hører til i en kategori og er knyttet til en producent. I skal selv udtænke hvordan datastrukturen for prokdukter mv. skal stilles op. Brug json-server som data-kilde
*(billederne findes i den medfølgende .zip fil, men ved alle de andre produktdata finder I selv på noget, benyt evt https://lipsum.com/feed/html eller få hjælp fra AI til at generere produkt-beskrivelser og anden data. )*

### Tekniske krav
**Client-Side** skal løses som et React.js-projekt, som ved hjælp af fetch-api'et henter data fra en json-server. I vælger i gruppen, hvordan I arbejder med CSS (CSS, SCSS, SASS, Tailwind etc.), Produktet _kan_ designes efter mobile first princippet, men ikke nødvendigvis implementeret til begge medier *(prioriter browser varianten som den primære der produceres)*.


### Planlægning
* Layoutanalyse - identificer komponenter/moduler i layoutet. (Husk at analysere "indefra og ud", så jeres komponenter/moduler ikke bliver for store).
* User stories - skriv user stories til alle komponenter - brug evt AI.
* Udarbejd 'definition of done' på de enkelte user-stories (brug evt. AI). Hvilke kriterier skal komponentet/modulet opfylde for at være færdigt? Hvad skal den som laver review kontrollere om er i orden?

### Forslag til arbejdsprocess
* Opsæt Projektet med routing, layout, header og footer, samt under-sider med navigation og dummy-data (statisk site)
* Design datastrukturer i JSON. (en test-fil med tre eller fire produkter som kan bruges i udviklingsfasen, så I nemt kan tilrette strukturerne)
* Programmér funktioner til dataudtræk
* Byg alle nødvendige fetch, og udskriv data fra fetch.
* Generer data til produkter vha. AI 


### Sider og indhold
* Forside
* Liste-visning
* Detalje-visning
* Kontakt-side
* About us / historie side
* More info / FAQ

### Ekstra sider / funktionalitet
* Sammenligning af produkter
* Indkøbskurv
* Login- og profil-funktionalitet
* Tilknytning af indkøbskurv til en registreret bruger
* Chek-ud flow ("køb") og ordrehistorik
 
### Forsiden 
* Forsidetekst og hero-billede eller video
* Visning af fire udvalgte produkter (kan være de senest oprettede, fire tilfældige produkter eller andet du finder relevant)
 
### Produktsider
Der er flere forskellige funktioner under produkter:
* Visning af alle produkter inden for en bestemt kategori, uden produkt beskrivelse
* Visning af alle produkter der hører til en bestemt producent, uden produkt beskrivelse
* Visning af ét produkt ved klik på et produkt fra listerne
* Visning af produkter efter søgning 

Alle produkter hentes via et api, og udskrives med fetch, alle produkter vises med deres billede.
 
### Alle sider 
* Menu 
* Fritekst-søgefunktion til produkter og producenter (visning på produktsiden) 
* Footer med kontaktinfo 

### Github
* Projektet accepteres som en GitHub assignment.
* Projekt-planlægningen udføres i et Github project, eller andet tilsvarende værktøj.
* Sørg for at arbejde med code-reviews, så et andet team-medlem kigger kode igennem inden det merges. 
* Der skal *committes ved væsentlige ændringer eller færdiggørelse af en funktionalitet* - og altid inden fyraften.
* Alle commit tekster på GitHub skal kort beskrive ændringerne. **Der må ikke skrives ligegyldige beskrivelser!**.

### Billedfiler
Alle billeder ligger i en zippet fil fordelt i mapper.

I vælger om alle billeder skal ligge i én mappe eller om I vil bevare mappestrukturen.

Brug følgende liste, hvis I er i tvivl om hvilke kategorier de forskellige billeder tilhører:

  
**CD Afspillere**

    * creek_classic_cd.jpg
    * creek_Destiny_CD.jpg
    * creek_evo_cd.jpg
    * Exp_2010S_CD.gif


**DVD Afspillere**

    * creek_classic.jpg
    * exposure_2010S.jpg
    * parasound_d200.jpg
    * parasound_halod3.jpg

**Effektforstærkere**

    * manley_mahi.jpg
    * manley_neoclassic300b.jpg
    * manley_snapper.jpg
    * parasound_haloa23.jpg


**Forforstærkere**

    * Creek_OBH_22_Passive_Preamp.jpg
    * parasound_classic7100.jpg
    * parasound_halop3.jpg
    * Project_prebox.jpg


**Højtalere**

    * boesendorfer_vcs_wall.gif
    * epos_m5.gif
    * harbeth_hl7es2.jpg
    * harbeth_monitor30.jpg
    * harbeth_p3es2.jpg


**Int. Forstærkere**

    * creek_a50I.jpg
    * creek_classic5350SE.jpg
    * creek_destinyamp.jpg
    * manley_snapper.jpg
    * Manley_Stingray.jpg


**Pladespillere**

    * Pro_ject_Debut_3_bl.jpg
    * Pro_ject_Debut_III_red_1.jpg
    * Pro_ject_Debut_III_yellow_1.jpg
    * Pro_ject_rpm_5.jpg
    * Pro_ject_rpm10.jpg


**Rørforstærkere**

    * jolida_JD102b.jpg
    * jolida_JD202a.jpg
    * jolida_JD300b.jpg
    * jolida_JD302b.jpg
    * jolida_JD502b.jpg 
 
## EKSTRA-EKSTRAOPGAVE
Hvis I er hurtigt færdige!

Indsæt reklmebannere på hjemmesiden. Du skal selv beslutte hvor på siden reklamebannere vil passe ind. Find et API på nettet, som lader dig fetche bannere og indsæt vilkårlige bannere på hjemmesiden.
