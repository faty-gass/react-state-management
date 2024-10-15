# Exercice: Gestion d'État Dynamique

## Getting up and running

After cloning the repo, you should install the dependencies

```bash
yarn install
```

then you can launch the project

```bash
yarn dev
```

## About

Using react flow, we built 3 custom nodes with different states :

- CounterNode with a count that can be incremented or decremented. This node can only share its state but not receive one.
- ColorPickerNode with a color input. This node can only share its state but not receive one.
- NotepadNode with a textarea. This node can use the states of the counter and color picker but cannot share its state.

When a notepad is linked to a counter the size of the text with be updated according to the value of that counter.
When a notepad is linked to a color picker, the background color of the notepad with be updated according to the value of that counter.
