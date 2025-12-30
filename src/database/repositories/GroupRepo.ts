// src/database/repositories/GroupRepo.ts
import { getDB } from "../index.js";

// trava simples contra race condition / spam / lag
const groupLocks = new Set<string>();

export const GroupRepo = {
  ensure(jid: string) {
    getDB()
      .prepare(
        "INSERT OR IGNORE INTO groups (jid, is_open) VALUES (?, 1)"
      )
      .run([jid]);
  },

  open(jid: string) {
    if (groupLocks.has(jid)) return;
    groupLocks.add(jid);

    try {
      this.ensure(jid);
      getDB()
        .prepare("UPDATE groups SET is_open = 1 WHERE jid = ?")
        .run([jid]);
    } finally {
      groupLocks.delete(jid);
    }
  },

  close(jid: string) {
    if (groupLocks.has(jid)) return;
    groupLocks.add(jid);

    try {
      this.ensure(jid);
      getDB()
        .prepare("UPDATE groups SET is_open = 0 WHERE jid = ?")
        .run([jid]);
    } finally {
      groupLocks.delete(jid);
    }
  },

  isOpen(jid: string): boolean {
    const row = getDB()
      .prepare("SELECT is_open FROM groups WHERE jid = ?")
       .getAsObject([jid]) as { is_open: number } | undefined;

    return row?.is_open === 1;
  }
};