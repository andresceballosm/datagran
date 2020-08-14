import React, {useState, Fragment} from 'react';
import { Steps } from 'antd';
import '../App.css';
import InputCSV from './InputCSV';
import GraphComponent from './Graph'

const { Step } = Steps;

function StepsComponent(): JSX.Element {

  const [step, setStep] = useState(0);
  const [dataCSV, setDataCSV] = useState<string[]>([]);

  const nextStep = (data:[]) => {
    let current: number = step + 1;
    setStep(current);
    setDataCSV(data);
  };

  const prevStep = () => {
    const current: number = step - 1;
    setStep(current);
  };

  const steps = [
    {
      title: 'Paste CSV',
      content: <InputCSV goNextStep={nextStep} />,
    },
    {
      title: 'Graph',
      content: <GraphComponent data={dataCSV} goPrevStep={prevStep} />,
    }
  ];

  return (
    <Fragment>
        <Steps current={step}>
          { steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[step].content}</div>
    </Fragment>
  );
}

export default StepsComponent;
