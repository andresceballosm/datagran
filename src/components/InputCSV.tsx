import React, {useState, Fragment} from 'react';
import { Input, Button, message } from 'antd';
import StringCSV from '../utils/StringCSV';
const { TextArea } = Input;

type FormElement = React.FormEvent<HTMLFormElement>;

interface Props {
  goNextStep(data: string[]): void;
}

function InputCSV(props:Props): JSX.Element {

  const [data, setData] = useState<string>("");

  const handleSubmit = ( e: FormElement) => {
    e.preventDefault();
    if(data.length > 0){
      let obj = StringCSV(data);
      props.goNextStep(obj);
      setData('')
    } else {
      message.warning('First enter CSV string, please!')
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TextArea rows={4} onChange={ e => setData(e.target.value)} value={data} />
        <Button htmlType="submit" style={{ margin: '0 8px' }}>
            Process
        </Button>
      </form>
    </Fragment>
  );
}

export default InputCSV;
