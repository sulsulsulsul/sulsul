import { ArchiveDetailView } from '@/entities/archives/views/archive-detail-view'
import { redirect } from 'next/navigation'

interface ArchiveDetail {
  params: {
    id: string
  }
}

const ArchiveDetailPage = ({ params: { id } }: ArchiveDetail) => {
  if (!id) {
    redirect('/')
  }
  return <ArchiveDetailView id={id} />
}

export default ArchiveDetailPage
