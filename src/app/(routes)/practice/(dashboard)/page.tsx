import { CurrentStatus } from './components/current-status'
import { LatestPractice } from './components/latest-practice'
import { StatusChart } from './components/status-chart'

const Page = async () => {
  return (
    <main>
      <CurrentStatus />
      <div className="mt-[80px] grid grid-cols-2 gap-6">
        <LatestPractice className="col-span-1" />
        <StatusChart className="col-span-1" />
      </div>
    </main>
  )
}

export default Page
