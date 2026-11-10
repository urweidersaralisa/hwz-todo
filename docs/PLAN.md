# PLAN: Wie die App gebaut wird

Diese Datei füllt /plan aus docs/SPEC.md.

## Stack

Siehe docs/STACK.md. Keine Abweichungen.

## Ordner und Dateien

Bau 1 bleibt unverändert, wird nur erweitert:

- `src/features/tasks/model.ts`: `Task.status` (todo/doing/done) statt `done`, neue Funktion `moveTask`.
- `src/features/tasks/model.test.ts`: Tests für `moveTask` und den neuen Status.
- `src/lib/storage.ts`: `CURRENT_VERSION = 2`, Migration `migrateV1toV2` für gespeicherte Aufgaben.
- `src/lib/storage.test.ts`: Tests für die Migration mit echten Version-1-Daten.
- `src/features/tasks/components/Board.tsx`: Scrum Board mit drei Spalten und Drag and Drop (Design Rezept 6).
- `src/features/tasks/components/BoardColumn.tsx`: eine Spalte «Zu lernen», «Am Lernen» oder «Kann ich!».
- `src/features/tasks/components/KanbanCard.tsx`: Karte im Board mit Chili-Icons; ersetzt die Checkbox durch Spalten-Logik.
- `src/features/tasks/components/SprintHeader.tsx`: Sprint-Ziel und verbleibende Tage oben.
- `src/lib/sprint.ts`: festes Enddatum und Funktion für die verbleibenden Tage, getestet.
- `src/lib/sprint.test.ts`: Tests für die Tagesberechnung.
- `src/App.tsx`: Rahmen mit SprintHeader statt Zähler, rendert Board statt TaskList.

## Datenmodell

```ts
export type Difficulty = 1 | 2 | 3
export type Status = 'todo' | 'doing' | 'done'

export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  difficulty: Difficulty // 1 = 🌶️ easy, 2 = 🌶️🌶️ knifflig, 3 = 🌶️🌶️🌶️ brennt
  status: Status // todo = «Zu lernen», doing = «Am Lernen», done = «Kann ich!»
  createdAt: number // Date.now()
}
```

localStorage `"hwz-todo"` = `{ version: 2, tasks: Task[] }`. Migration `migrateV1toV2` (docs/STACK.md, «Datenhaltung»): `done: true` → `status: 'done'`, `done: false` → `status: 'todo'`. Gespeicherte Aufgaben gehen nie verloren.

## Komponenten

- SprintHeader: zeigt oben das Sprint-Ziel und «Noch N Tage» bis zum festen Enddatum (Design Rezept 1, Kopf).
- Board: Raster mit drei Spalten, DndContext und SortableContext (Design Rezept 6).
- BoardColumn: eine Spalte mit Überschrift, Zähler-Badge und Drag-and-Drop-Ziel (Design Rezept 6).
- KanbanCard: Karte in einer Spalte, per Maus und Tastatur verschiebbar, Chili-Icons sichtbar (Design Rezept 3 angepasst).
- App: Rahmen mit SprintHeader und Board, Toaster bleibt.

## Risiken

- Bestehende Daten im localStorage (Version 1) passen nicht zum neuen Status: Migration mit eigenem Test und echten Version-1-Daten (AGENTS.md, Regel 9).
- Drag and Drop ist anfällig für falsche Reihenfolge: `moveTask` als reine Funktion in model.ts mit Tests; DndContext-Sensoren mit Tastatur-Unterstützung.
- Fester Sprint-Endtermin wird falsch gerechnet: Tagesberechnung in `src/lib/sprint.ts` mit Tests (Spring-/Winterzeit, Abrundung).
