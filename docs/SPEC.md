# SPEC: Was die App können muss

Diese Datei füllt /spec. Ein ausgefülltes Beispiel steht in docs/PROMPTS.md unter «Beispiel einer SPEC».

## Ziel

Eine lustige Lernliste «CAS-Überlebensliste» für meinen CAS Agentic AI: Ich erfasse Begriffe und Themen schnell, ordne jedem einen Schwierigkeitsgrad zu, hake Gelerntes als «kann ich!» ab und lösche Einträge – so, dass nach dem Neuladen alles noch da ist.

## Muss

- Ich erfasse einen Begriff oder ein Thema mit einem Schwierigkeitsgrad (🌶️ easy, 🌶️🌶️ knifflig, 🌶️🌶️🌶️ brennt) und füge ihn der Liste hinzu.
- Ich hake einen Eintrag als «kann ich!» ab – mit Konfetti und einem zufälligen witzigen Spruch. Ein zweiter Klick macht es rückgängig.
- Ich lösche einen Eintrag, versehentlich Gelöschtes stelle ich über «Rückgängig» wieder her.
- Oben steht ein Zähler wie «5 zu lernen · 3 gelernt», und ein Fortschrittsring zeigt den Anteil.
- Sind alle Einträge gelernt, erscheint «Prüfung? Kann kommen! 🎓».
- Die Daten bleiben nach dem Neuladen erhalten.

## Look

Candy

## Nicht

- Kein Login, kein Server. Die Daten bleiben im Browser.
- Kein nachträgliches Bearbeiten von Einträgen (nur erfassen, abhaken, löschen).
- Keine Sortierung oder Kategorisierung nach Schwierigkeit.

## Fertig, wenn

1. Leere Eingabe
   - Gegeben: Das Eingabefeld ist leer oder enthält nur Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: wird nichts hinzugefügt, das Feld schüttelt sich und der Fokus bleibt im Feld.

2. 200 Zeichen
   - Gegeben: Ich tippe einen Titel mit mehr als 200 Zeichen.
   - Wenn: Ich ihn abschicke.
   - Dann: wird er auf 200 Zeichen gekürzt, der Text bricht in der Karte um und läuft nicht aus der Karte.

3. Neu laden
   - Gegeben: Ich habe Einträge erfasst und einige abgehakt.
   - Wenn: Ich die Seite neu lade.
   - Dann: sind alle Einträge samt Schwierigkeitsgrad und Abhak-Zustand noch da.

4. Abhaken
   - Gegeben: Ein offener Eintrag.
   - Wenn: Ich ihn abhake.
   - Dann: wird der Text animiert durchgestrichen, es gibt Konfetti und einen zufälligen witzigen Spruch, und der Zähler erhöht sich. Ein zweiter Klick macht es rückgängig.

5. Schmales Fenster
   - Gegeben: Das Fenster ist 360 px breit.
   - Wenn: Ich die Liste bediene.
   - Dann: ist alles lesbar und bedienbar, ohne seitliches Scrollen.

6. Erfassen mit Schwierigkeitsgrad
   - Gegeben: Das Eingabefeld.
   - Wenn: Ich einen Begriff mit einem gewählten Schwierigkeitsgrad abschicke.
   - Dann: erscheint eine neue Karte oben in der Liste mit genau diesem Begriff und den passenden Chili-Symbolen.

7. Zähler und Fortschritt
   - Gegeben: 5 offene und 3 gelernte Einträge.
   - Wenn: Ich die App öffne.
   - Dann: zeigt der Zähler «5 zu lernen · 3 gelernt» und der Fortschrittsring 3/8.

8. Löschen mit Rückgängig
   - Gegeben: Ein Eintrag in der Liste.
   - Wenn: Ich ihn lösche.
   - Dann: verschwindet er mit einem Toast «Aufgabe gelöscht» und «Rückgängig», und Rückgängig stellt ihn an seiner alten Stelle wieder her.

9. Alles gelernt
   - Gegeben: Kein Eintrag ist mehr offen.
   - Wenn: Ich den letzten offenen Eintrag abhake.
   - Dann: erscheint die Botschaft «Prüfung? Kann kommen! 🎓».

## Features

(leer)
