import { Injectable } from '@nestjs/common';
import { UserRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface UserRequestDB extends UserRequest {
  id: string;
  submittedAt: Date;
}

export interface UserRequestData {
  requests: UserRequestDB[];
}

const adapter = new FileSync<UserRequestDB>('./db/user-requests.json');
const db = low(adapter);

db.defaults({ requests: [] }).write();

@Injectable()
export class UserRequestDao {
  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async registerAdmin(admin: UserRequest) {
    const id = { id: nanoid.nanoid(10) };
    const user = await this.collection.find({ email: admin.email }).value();
    if (user) {
      return { error: "User already exists" };
    }
    await this.collection
      .push({
        ...id,
        ...admin,
        submittedAt: new Date(),
        isAdmin: true,
      })
      .write();
    return id;
  }

  async loginAdmin(email: string, password: string): Promise<any> {
    const user = await this.collection.find({email}).value();
    if (!user) {
      return { error: "User not found" };
    }
    if (user.password !== password) {
      return { error: "Invalid password" };
    }

    const token = Buffer.from(`${user.email}:${new Date().getTime()}`).toString('base64'); // this is just dummy token 

    return { token, user };
  }
}
