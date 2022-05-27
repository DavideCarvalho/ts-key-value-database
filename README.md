# TS key value database

A database only for interviews purpose

## How to use

- Run `npm i` to install the dependencies
- Run `npm run start` to run the application

## About it

### index.ts

This file only contains the logic to listen for the user input, and match the inputs to the database needed actions


### database.ts

This is where all the logic lies.

This example of database tries to achieve the operations needed for a CRUD, and also what's needed for transactions.

Since the idea was a key-value database, we used the Map structure to give us a good foundation. So the get, set and remove actions are just the same Map actions

To get transactions, we used the idea of database snapshots. When you create the database, it starts with a single snapshot, and of course, it's an empty snapshot.

All the actions are run in a snapshot, so when you do a get, or a set, these actions are made on the snapshot that's responsable at that moment

When you make a BEGIN action, we create a new snapshot based on the current one. This snapshot is now your current database snapshot, and as I said before, now your actions are being made to this new database snapshot.

When you use the ROLLBACK action, the current database snapshot is destroyed, and the last database snapshot takes place.

If you have only one snapshot available (like when you just start your application), your COMMIT and ROLLBACK actions do nothing


## Will I keep this experiment?

Maybe. I really wanna play with ACID. For this, all the actions would need to go through a "queue" of actions, where I can make sure what action was made first.
