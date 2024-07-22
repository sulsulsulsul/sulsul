import { redirect } from 'next/navigation'

import { ArchiveDetailView } from '@/entities/archives/views/archive-detail-view'

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
