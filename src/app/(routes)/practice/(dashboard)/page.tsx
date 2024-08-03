'use client'
import { useState } from 'react'

import PracticeSelection from '@/entities/practice-list-modal'
import { usePracticeStore } from '@/store/practiceStore'

import { CurrentStatus } from './components/current-status'
import { LatestPractice } from './components/latest-practice'
import { StatusChart } from './components/status-chart'

const Page = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <main>
      <CurrentStatus setModalOpen={setOpenModal} />
      {openModal && <PracticeSelection setModal={setOpenModal} />}
      <div className="mt-[80px] grid grid-cols-2 gap-6">
        <LatestPractice className="col-span-1" />
        <StatusChart className="col-span-1" />
      </div>
    </main>
  )
}

export default Page
