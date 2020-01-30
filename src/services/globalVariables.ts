import Variable from '@/models/variable';

export class User {
    id!: string;
    name!: string;
    isAnonymous: boolean = false;
}

export class GlobalVariables {
    public user: User = new User();

    public sort: Variable = new Variable('sort', '0');
    public group: Variable = new Variable('group', '0');

    public darkMode: Variable = new Variable('dark_mode', '0');
    public themeColor: Variable = new Variable('theme_color', '#1976d2');

    public autosave: Variable = new Variable('autosave', '1');
    public autosaveInterval: Variable = new Variable('autosave_interval', '2500');

    public lang: Variable = new Variable('lang', 'en');
}

export const globalVariables: GlobalVariables = new GlobalVariables();
