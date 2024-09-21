import * as React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: '최다 빈출 기본질문',
    description: ['2/10개'],
  },
  {
    label: '직무역량 & 경험',
    description: ['0/18개', '0/18개'],
  },
  {
    label: '회사 로열티 & 컬쳐핏',
    description: ['0/19개', '0/20개'],
  },
  {
    label: '가치관 & 비전',
    description: ['0/15개'],
  },
];

export default function VerticalLinearStepper() {
  const [activeSteps, setActiveSteps] = React.useState<boolean[]>(
    Array(steps.length).fill(true),
  );

  const CustomStepIcon = () => {
    return (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#576DFC',
          marginLeft: '6px',
        }}
      />
    );
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper orientation="vertical" nonLinear>
        {steps.map((step, index) => (
          <Step key={step.label} active={activeSteps[index]}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.label}
            </StepLabel>
            {activeSteps[index] &&
              step.description.map((item, descIndex) => (
                <StepContent key={descIndex}>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: '#888CA0',
                      marginBottom: '15px',
                    }}
                  >
                    {item}
                    {/* <button
                    className="float-right bg-green-100 text-green-900 "
                    style={{ padding: '3px 10px', borderRadius: '8px' }}
                  >
                    작성완료
                  </button> */}
                    {/* <button
                    className="float-right bg-blue-500 text-white text-2xs"
                    style={{ padding: '3px 10px', borderRadius: '8px' }}
                  >
                    작성하기
                  </button> */}
                    <button
                      className="float-right bg-gray-100 text-2xs text-gray-500"
                      style={{ padding: '3px 10px', borderRadius: '8px' }}
                    >
                      작성 전
                    </button>
                  </Typography>
                </StepContent>
              ))}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
