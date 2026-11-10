# TASKS: Bauschritte

Diese Datei füllt /plan. /task arbeitet sie von oben nach unten ab und hakt jeden Task ab.
Ein Beispiel mit allen 6 Tasks von Bau 1 steht in docs/PROMPTS.md unter «Beispiel: die 6 Tasks von Bau 1».

Format je Task:

```text
[ ] N  Titel
- Ziel: Ein Satz, was danach sichtbar oder möglich ist.
- Dateien: Genau die Dateien, die geändert werden dürfen.
- Test zuerst: Welcher Test zuerst rot sein muss.
- Fertig wenn: Prüfbares Ergebnis plus «npm run check grün».
```

## Tasks

[x] 1  Projekt einrichten
- Ziel: Leerer App-Rahmen im Look Candy läuft unter http://localhost:5173/hwz-todo/.
- Dateien: alle aus docs/STACK.md, Abschnitt «Dateien für Task 1», plus src/components/ui/*.
- Test zuerst: src/App.test.tsx (kommt mit Task 1, siehe STACK.md).
- Fertig wenn: npm run check grün, Hero-Überschrift sichtbar.

[x] 2  Datenmodell und Store mit Tests
- Ziel: Aufgaben lassen sich mit Schwierigkeitsgrad anlegen, abhaken, löschen und im localStorage speichern, noch ohne Oberfläche.
- Dateien: src/features/tasks/model.ts, src/features/tasks/model.test.ts, src/lib/storage.ts, src/lib/storage.test.ts, src/features/tasks/useTasks.ts, src/features/tasks/useTasks.test.ts.
- Test zuerst: addTask ignoriert leeren Titel und kürzt auf 200 Zeichen; loadState gibt bei kaputtem JSON eine leere Liste zurück.
- Fertig wenn: alle Model- und Storage-Tests grün, npm run check grün. Kriterien «200 Zeichen» und «Neu laden».

[x] 3  Liste anzeigen
- Ziel: Gespeicherte Aufgaben erscheinen als TaskCards mit Listen-Animation und Chili-Icons.
- Dateien: src/features/tasks/components/TaskList.tsx, src/features/tasks/components/TaskCard.tsx, src/features/tasks/components/TaskCard.test.tsx, src/App.tsx.
- Test zuerst: TaskList zeigt zwei Aufgaben aus dem localStorage nach dem Rendern an.
- Fertig wenn: Aufgaben sichtbar (DESIGN.md, Rezepte 3, 4, 7), npm run check grün.

[x] 4  Aufgabe hinzufügen
- Ziel: Neue Aufgabe per Enter oder Plus-Knopf mitgewähltem Schwierigkeitsgrad, leere Eingabe schüttelt.
- Dateien: src/features/tasks/components/TaskInput.tsx, src/features/tasks/components/TaskInput.test.tsx, src/lib/useHotkey.ts, src/App.tsx.
- Test zuerst: Tippen + Enter zeigt die Aufgabe; Enter bei leerem Feld fügt nichts hinzu; «N» fokussiert das Feld.
- Fertig wenn: DESIGN.md, Rezepte 2 und 9 erfüllt, npm run check grün. Kriterien «Leere Eingabe» und «Erfassen mit Schwierigkeitsgrad».

[x] 5  Abhaken und löschen
- Ziel: Abhaken mit Federn, Durchstreichen, Konfetti und witzigem Spruch; Löschen mit Toast «Rückgängig».
- Dateien: src/features/tasks/components/TaskCard.tsx, src/features/tasks/components/TaskCard.test.tsx, src/lib/celebrate.ts, src/lib/theme.ts.
- Test zuerst: Klick auf Checkbox setzt done und ruft celebrate auf; Löschen und «Rückgängig» stellt die Aufgabe wieder her.
- Fertig wenn: DESIGN.md, Rezept 3 erfüllt, Zustand bleibt nach Neuladen, npm run check grün. Kriterien «Abhaken» und «Löschen mit Rückgängig».

[ ] 6  Migration Version 1 auf 2
- Ziel: Gespeicherte Aufgaben aus der Liste (done) wandern verlustfrei in das neue Board (status).
- Dateien: src/lib/storage.ts, src/lib/storage.test.ts.
- Test zuerst: migrateV1toV2 mit echten Version-1-Daten setzt done:true → status 'done' und done:false → status 'todo'.
- Fertig wenn: Migration getestet, npm run check grün. Kriterium «Daten überleben» aus F1.

[ ] 7  Board-Datenmodell und moveTask
- Ziel: Task hat status statt done; die reine Funktion moveTask verschiebt eine Karte in eine andere Spalte und Position.
- Dateien: src/features/tasks/model.ts, src/features/tasks/model.test.ts, src/features/tasks/useTasks.ts.
- Test zuerst: moveTask ändert Status und Reihenfolge; addTask legt mit status 'todo' an.
- Fertig wenn: alle Model-Tests grün, npm run check grün.

[ ] 8  Sprint-Kopf mit Tagen
- Ziel: Oben stehen Sprint-Ziel und «Noch N Tage» bis zum festen Enddatum.
- Dateien: src/lib/sprint.ts, src/lib/sprint.test.ts, src/features/tasks/components/SprintHeader.tsx, src/App.tsx.
- Test zuerst: daysRemaining rechnet für ein Datum in 12 Tagen «12».
- Fertig wenn: Kriterium «Sprint-Ziel und Tage» aus F1 erfüllt, npm run check grün.

[ ] 9  Board mit drei Spalten
- Ziel: Drei Spalten «Zu lernen», «Am Lernen», «Kann ich!» zeigen jede Karte in der Spalte ihres Status, Chilis bleiben sichtbar.
- Dateien: src/features/tasks/components/Board.tsx, src/features/tasks/components/BoardColumn.tsx, src/features/tasks/components/KanbanCard.tsx, src/App.tsx.
- Test zuerst: Board zeigt die drei Spalten und ordnet Aufgaben nach Status ein.
- Fertig wenn: Kriterien «Drei Spalten» und «Chilis bleiben» aus F1 erfüllt, npm run check grün.

[ ] 10  Drag and Drop
- Ziel: Karten per Maus und Tastatur zwischen den Spalten und innerhalb einer Spalte ziehen; Zielspalte leuchtet; Zustand bleibt nach Neuladen.
- Dateien: src/features/tasks/components/Board.tsx, src/features/tasks/components/BoardColumn.tsx, src/features/tasks/components/KanbanCard.tsx, src/App.tsx.
- Test zuerst: moveTask-Test belegt das Verschieben in eine andere Spalte (Logik), dazu Komponenten-Test für den DndContext.
- Fertig wenn: Kriterium «Drag and Drop» aus F1 erfüllt, Design Rezept 6, npm run check grün.

