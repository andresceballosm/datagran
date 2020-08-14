import React, { useEffect, useState } from 'react';
import '../App.css';
import { Table } from 'antd';
import { IPosts, IColumn } from '../types'

interface Props {
  setQuery(data: {}): void;
  data:IPosts[];
  columnsAction: string[];
}

function TableComponent(props:Props): JSX.Element {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [data, setData] = useState<IPosts[]>([])

  const selectCell = (e:any) => {
    props.setQuery({
      name: e.currentTarget.dataset.name,
      id : e.currentTarget.dataset.id
    })
  };

  useEffect(() => {
    if(props.data.length > 0){
      let keys = Object.keys(props.data[0]);
      let columnsData:IColumn[] = [];

      keys.forEach(key => {
        let action = props.columnsAction.filter((value:string) => value === key);
        columnsData.push({
          title: key.toUpperCase(),
          dataIndex: key,
          render: action.length > 0 ? ((text:string) => <a data-name={key} data-id={text} onClick={selectCell}>{text}</a>) : null,
        })
      });
      setColumns(columnsData);  
      setData(props.data) 
    } 
  },[props.data]);

  return (
    <Table 
    columns={columns}
    dataSource={data}
    rowKey='id'
    />
  );
}

export default TableComponent;
