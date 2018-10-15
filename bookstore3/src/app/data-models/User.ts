export class User {

  public id: number;

  public login: string;

  public email: string;

  public phone: string;

  public adress: string;

  public name: string;

  public lastname: string;

  public role: string;

  public clientGroup: string;

  public avatar: string;

  constructor(id: number, login: string, email: string,
              phone: string, adress: string, name: string, lastname: string,
              role: string, clientGroup: string, avatar: string) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.phone = phone;
    this.adress = adress;
    this.name = name;
    this.lastname = lastname;
    this.role = role;
    this.clientGroup = clientGroup;
    this.avatar = avatar;
    console.log('user constructor ' + id);
  }


}
