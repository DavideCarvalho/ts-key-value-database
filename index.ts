import * as PromptSync from 'prompt-sync';
import { KeyValueDatabase } from './database';

const prompt: PromptSync.Prompt = require('prompt-sync')();

let database = new KeyValueDatabase();

let endProgram = false;
do {
  const OPERATION = prompt(
    `What do you want to do? (SET/GET/UNSET/NUMEQUALTO/END/BEGIN/ROLLBACK/COMMIT)`
  );

  if (OPERATION === 'BEGIN') {
    database.beginTransaction();
    continue;
  }

  if (OPERATION === 'COMMIT') {
    database.commit();
    continue;
  }

  if (OPERATION === 'ROLLBACK') {
    database.rollback();
    continue;
  }

  if (OPERATION === 'SET') {
    const KEY = prompt(`Whats the name of the key?`);
    const VALUE = prompt(`And it's value?`);
    database.set(KEY, VALUE);
    continue;
  }

  if (OPERATION === 'GET') {
    const KEY = prompt(`Whats the name of the key?`);
    const value = database.get(KEY);
    if (!value) continue;
    console.log(value);
    continue;
  }

  if (OPERATION === 'UNSET') {
    const KEY = prompt(`Whats the name of the key?`);
    database.unset(KEY);
    continue;
  }

  if (OPERATION === 'NUMEQUALTO') {
    const VALUE = prompt(`What's the value?`);
    console.log(database.numEqualTo(VALUE));
    continue;
  }

  if (OPERATION === 'END') {
    endProgram = true;
    continue;
  }

  console.log('Action not avaliable, please try again')
} while (endProgram === false);
