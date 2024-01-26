import { Client } from "pg";
import { Account } from "../models/account.model";
import IAccountRepository from "./account.repository";
import { accountFromRow } from "./mappings";
import bcrypt from 'bcrypt';

const saltRounds = 8

export default class AccountRepository implements IAccountRepository {

  client: Client

  insertAccountStmt: string = `INSERT INTO "account" (email, password, is_active, created_at)
    VALUES($1, $2, $3, $4) RETURNING *`

  findByEmailStmt: string = `SELECT id, email, is_active, created_at, updated_at, deleted_at FROM "account" WHERE email=$1`;

  loginStmt: string = `SELECT id, email, password FROM "account" WHERE email=$1`;

  constructor(client: Client) {
    this.client = client;
  }

  async save(account: Account): Promise<Account> {
    try {
      account.user.createdAt = new Date()
      if (account.user.password) {
        account.user.password = await bcrypt.hash(account.user.password, saltRounds);
      }

      let result = await this.client.query(this.insertAccountStmt, [account.user.email, account.user.password, account.user.isActive, account.user.createdAt])

      let [row] = result.rows

      if (row === undefined)
        throw new Error("Couldn't insert user account")

      return accountFromRow(row)
    }
    catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<Account> {
    try {
      let result = await this.client.query(this.findByEmailStmt, [email])

      let [row] = result.rows

      return row
    } catch (error) {
      throw error;
    }
  }

  async findAccount(email: string): Promise<Account> {
    try {
      let result = await this.client.query(this.loginStmt, [email])

      let [row] = result.rows

      if (!row) {
        throw new Error("Email not found");
      }

      return {
        user: {
          id: row.id,
          email: row.email,
          password: row.password,
        },
      };
    } catch (error) {
      throw error;
    }
  }

}
