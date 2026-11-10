# PLAN: Wie die App gebaut wird

Diese Datei füllt /plan aus docs/SPEC.md.

## Stack

Siehe docs/STACK.md. Keine Abweichungen.

## Ordner und Dateien

- `src/features/tasks/model.ts`: Typ Task mit Schwierigkeitsgrad und reine Funktionen addTask, toggleTask, removeTask.
- `src/features/tasks/model.test.ts`: Tests für das Modell.
- `src/lib/storage.ts`: Zustand im localStorage lesen, schreiben, migrieren.
- `src/lib/storage.test.ts`: Tests für die Ablage.
- `src/features/tasks/useTasks.ts`: React-Hook, verbindet Modell mit Ablage.
- `src/features/tasks/useTasks.test.ts`: Tests für den Hook.
- `src/features/tasks/components/TaskInput.tsx`: Eingabefeld mit Plus-Knopf und Chili-Wahl.
- `src/features/tasks/components/TaskInput.test.tsx`: Tests für die Eingabe.
- `src/features/tasks/components/TaskList.tsx`: Liste mit Listen-Animation.
- `src/features/tasks/components/TaskCard.tsx`: Karte mit Abhaken, Durchstreichen, Löschen.
- `src/features/tasks/components/TaskCard.test.tsx`: Tests für die Karte.
- `src/features/tasks/components/EmptyState.tsx`: Leerer Zustand mit Illustration.
- `src/components/ProgressRing.tsx`: Fortschrittsring oben.
- `src/components/ProgressRing.test.tsx`: Tests für den Ring.
- `src/lib/celebrate.ts`: Konfetti + witzigen Spruch, im Test ersetzbar.
- `src/lib/theme.ts`: Konfetti-Farben aus den CSS-Variablen lesen.
- `src/lib/useHotkey.ts`: Hook für die N-Taste.
- `src/App.tsx`: Rahmen mit Hero, Zähler, ProgressRing, Toaster.

## Datenmodell

```ts
export type Difficulty = 1 | 2 | 3

export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  difficulty: Difficulty // 1 = 🌶️ easy, 2 = 🌶️🌶️ knifflig, 3 = 🌶️🌶️🌶️ brennt
  done: boolean
  createdAt: number // Date.now()
}
```

localStorage `"hwz-todo"` = `{ version: 1, tasks: Task[] }`. Neue App, keine Migration nötig.

## Komponenten

- TaskInput: Eingabefeld, Plus-Knopf und Auswahl des Schwierigkeitsgrads (Chili) vor dem Hinzufügen (DESIGN.md, Rezept 2).
- TaskList: Liste aller Karten mit Ein-/Ausgleiten (DESIGN.md, Rezept 4).
- TaskCard: Karte mit Checkbox (federt, Konfetti, Durchstreichen) und Löschen (Toast «Rückgängig»); zeigt die Chili-Icons (DESIGN.md, Rezept 3).
- ProgressRing: zeigt gelernt/gesamt als Ring mit Zähler in der Mitte (DESIGN.md, Rezept 1).
- EmptyState: Illustration des Looks und freundlicher Satz (DESIGN.md, Rezept 5).
- App: Rahmen mit Hero, Datum, Zähler und Ring (DESIGN.md, Rezept 1).

## Risiken

- Konfetti und Spruch sollen beim Abhaken nur einmal und nicht bei reduzierter Bewegung laufen: zentriert in `src/lib/celebrate.ts`, prüft `prefers-reduced-motion`.
- Daten nach dem Neuladen verloren: gesamter Zustand bei jeder Änderung speichern (`saveState`), Ablage in `src/lib/storage.ts` getestet.
- Leere oder zu lange Titel zerstören die Liste: `addTask` ignoriert leere Titel und kürzt auf 200 Zeichen, mit Tests.
