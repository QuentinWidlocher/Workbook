import Variable from "@/models/variable";

export class GlobalVariables {
  public userId: Variable = new Variable();

  constructor() {
    this.userId.name = "user_id";
    this.userId.value = "mvmhLPX7RBG3KacrKhl4";
  }
}

export const globalVariables: GlobalVariables = new GlobalVariables();
