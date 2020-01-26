import Variable from '@/models/variable';

export class GlobalVariables {
    public userId: string = '';
    public username: string = '';

    public sort: Variable = new Variable('sort', 'alphabetical');

    public darkMode: Variable = new Variable('dark_mode', '0');
    public themeColor: Variable = new Variable('theme_color', '#1976d2');

    public autosave: Variable = new Variable('autosave', '1');
    public autosaveInterval: Variable = new Variable('autosave_interval', '5000');

    public lang: Variable = new Variable('lang', 'en');
}

export const globalVariables: GlobalVariables = new GlobalVariables();
