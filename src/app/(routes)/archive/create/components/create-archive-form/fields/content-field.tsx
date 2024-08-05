import { HTMLAttributes } from 'react'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCurrentUser } from '@/entities/users/hooks'
import { cn } from '@/lib/utils'
import { useSampleStore } from '@/store/sampleQuestions'

import { useCreateArchiveFormContext } from '../../../hooks/use-create-archive-form'
interface ContentFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const ContentField = ({ className, ...props }: ContentFieldProps) => {
  const { form } = useCreateArchiveFormContext()
  const { isSampleClicked } = useSampleStore()
  const {status} = useCurrentUser()

  return (
    <div className={cn(className)} {...props}>
      {isSampleClicked ? (
        <div className="text-base text-gray-800">
          <p>
            저는 SK SUNNY 사회변화 챌린지 프로젝트에서 ‘슬기로운 화재대피’팀
            으로 활동하며, 최우수팀 선정 및 소방서장 표창을 수상한 경험이
            있습니다. 저희 팀은 지하철 화재 시, 정확한 대피요령에 대한 시민들의
            낮은 접근성과 이로 인한 대피요령 숙지가 미흡한 점에 문제의식을 갖고,
            이를 개선하기 위해 지하철을 이용하는 시민들에게 접근성이 높은 역사
            계단을 활용하여 화재 대피요령이 담긴 계단 스티커를 직접 제작하여
            부착하였습니다.
          </p>
          <br />
          <p>
            대학생 신분으로서 서울교통공사 측으로부터 솔루션 부착을 승인받기
            어려웠지만, 소방 전문가와 협력하여 솔루션의 신뢰성을 높이는 등 여러
            커뮤니케이션 전략을 통해 설득을 시도한 끝에 8호선 산성역에서 MVP
            테스트를 진행할 수 있었고, 부착기간 동안 진행한 현장 설문조사에서
            긍정적인 피드백을 받아 추가적으로 6개의 역사에 솔루션을 확산시킬 수
            있었습니다. 이러한 과정 속에서 저는 팀원들과 우리라는 공동체 의식을
            나누며, 다양한 상황에서도 함께 여러 솔루션을 모색할 수 있는 역량을
            함양하였습니다.
          </p>
        </div>
      ) : (
        <FormField
          control={form.control}
          name="resume"
          disabled={status==='unauthenticated'}
          render={({ field }) => (
            <FormItem className="size-full">
              <FormControl>
                <Textarea
                  maxLength={1999}
                  className="w-full border-0 px-0"
                  placeholder="300자 이상 2000자 이내의 내용을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
