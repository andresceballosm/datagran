export interface IPosts {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export interface IColumn {
    title: string;
    dataIndex: string;
    render: any;
}

export interface IParams {
    name : string;
    id : string;
}
