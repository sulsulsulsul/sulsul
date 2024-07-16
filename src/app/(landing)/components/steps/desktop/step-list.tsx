import { cn } from '@/lib/utils'

const StepItems = [
  {
    step: 'STEP 01',
    title: '면접 질문 예측하기',
    description:
      '면접은 지원자가 제출한 서류를 바탕으로 이루어진다는 사실! 내가 쓴 자소서를 입력하면 나를 위한 면접 예상질문이 생성돼요.',
  },
  {
    step: 'STEP 02',
    title: '나만의 답변 정리하기',
    description:
      '질문에 대한 답변을 작성하고 키워드 노트로 핵심 키워드를 정리해보세요. 작성한 답변에 대한 피드백 또한 받을 수 있답니다.',
  },
  {
    step: 'STEP 03',
    title: '실전 연습하기',
    description:
      '잘 답변할 수 있는 면접질문과 그렇지 못한 질문을 구분하고 스스로 질문에 대한 답변을 해보며 실전에 대비하세요.',
  },
]
interface StepListProps {
  activeStep: number
}

export const StepList = ({ activeStep }: StepListProps) => {
  return (
    <>
      {StepItems.map((stepItem, index) => (
        <div
          key={index}
          className={cn('transition-opacity', {
            'opacity-[0.18]': activeStep !== index,
          })}
        >
          <StepItem
            step={stepItem.step}
            title={stepItem.title}
            description={stepItem.description}
          />
        </div>
      ))}
    </>
  )
}

interface StepItemProps {
  step: string
  title: string
  description: string
}

const StepItem = ({ step, title, description }: StepItemProps) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-blue-500">{step}</h4>
      <h3 className="text-4xl font-bold text-gray-800">{title}</h3>
      <p className="mt-[12px] text-lg text-gray-600">{description}</p>
    </div>
  )
}
