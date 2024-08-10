'use client';
import { useEffect } from 'react';

import PracticeListItem from './components/practice-list-item';
import { usePracticeList } from './hook/use-get-practice-list';

export default function PracticeList() {
  //const { practiceArchive} = usePracticeArchive(0)
  //  const newPracticeArchive = practiceArchive?.archives.map((value)=>{
  //     //console.log("list" , list , "value" , value)
  //     return value
  //   })
  const { list } = usePracticeList();

  return (
    <section className="flex w-[1200px] flex-col gap-3">
      {//nedd Item id
      list?.map((resumeValue) => {
        return resumeValue.allQuestionsDetail.map((itemValue) => {
          return (
            <PracticeListItem
              key={resumeValue.archiveId}
              archiveId={resumeValue.archiveId}
              title={resumeValue.title}
              content={itemValue.content}
              companyName={resumeValue.companyName}
              isStar={itemValue.isStar}
              isHint={itemValue.isHint}
              questionId={0}
              practiceCount={itemValue.practiceCount}
              practiceTime={itemValue.practiceTime}
            />
          );
        });
      })}
    </section>
  );
}
