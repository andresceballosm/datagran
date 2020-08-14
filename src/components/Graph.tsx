import React, {useState, Fragment} from 'react';
import { Button, Select } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const { Option } = Select;

type FormElement = React.FormEvent<HTMLFormElement>;

interface Props {
  data: any[];
  goPrevStep(): void;
}

function GraphComponent(props:Props): JSX.Element {

    const [xHeader, setXHeader] = useState<string>("");
    const [yHeader, setYHeader] = useState<string>("");
    const [xValues, setXValues] = useState<string[]>([]);
    const [yValues, setYValues] = useState<number[]>([]);
   
    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        yAxis: {
            title: {
                text: yHeader
            },
            categories: yValues,
        },
        xAxis: {
            title: {
                text: xHeader
            },
            categories: xValues,
        },
        series: [
            {
                data: yValues
            }
        ]
    };

    const handleSubmit = ( e: FormElement) => {
        e.preventDefault();
       
        let indexY = 0;
        let indexX = 0;
        let valuesX = [];
        let valuesY = [];

        let headers = props.data[0];
        for (let i = 0; i < headers.length; i++) {
            if(headers[i] === yHeader){
                indexY = i;
            }
            if(headers[i] === xHeader){
                indexX = i;
            }  
        }

        for (let c = 0; c < props.data.length; c++) {
            if(c > 0){
                valuesX.push(props.data[c][indexX]);
                valuesY.push(parseInt(props.data[c][indexY]));
            }
        }

        setXValues(valuesX);
        setYValues(valuesY);
    };
    
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <Select 
                defaultValue="X AXIS" 
                onChange={ (e : string) => { setXHeader(e)}} 
                style={{ width: 120 }}>
                    { props.data[0].map((item : string, index : number) => 
                        <Option key={index} value={item}>{ item }</Option> 
                    )}
                </Select>
                <Select 
                defaultValue="Y AXIS" 
                onChange={ (e : string) => {  setYHeader(e)}} 
                style={{ width: 120 }}>
                    { props.data[0].map((item : string, index : number) => 
                        <Option key={index} value={item}>{ item }</Option> 
                    )}
                </Select>
                <Button htmlType="submit" style={{ margin: '0 8px' }}>
                    Apply
                </Button>
            </form>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <Button style={{ margin: '0 8px' }} onClick={() => props.goPrevStep()}>
                Previous
            </Button>
        </Fragment>
    );
}

export default GraphComponent;
