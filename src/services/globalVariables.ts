import Variable from "@/models/variable";

export class GlobalVariables {
  public userId: Variable = new Variable('user_id', 'mvmhLPX7RBG3KacrKhl4');
  public autosaveInterval: Variable = new Variable('autosave_interval', '5000');
  public sort: Variable = new Variable('sort', 'alphabetical');
}

export const globalVariables: GlobalVariables = new GlobalVariables();
