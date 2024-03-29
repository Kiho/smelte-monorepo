interface StringCollection {   
    [name: string]: string;
}

interface IField {
    label: string;
    field: string | Function;
    component: string;
    readOnly?: boolean;
    required?: boolean;
    row: number;
    col: string;
    class?: string;
    action?: (row) => void;
    optionList?: any[];
}

interface IColumn {
    label: string;
    field: string | Function;
    component: string;
    readOnly?: boolean;
    required?: boolean;
    sortable?: boolean;
    class?: string;
    action?: (row) => void;
}

interface IAppPage {
    path: string;
    form: HTMLElement;
    $set: (arg: any) => void;
    edit: (item, evt?) => void;
    close: () => void;
    getList: () => void;
}