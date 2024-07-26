import { CreateArchiveForm } from './components/create-archive-form'
import { FormStatus } from './components/form-status'
import { ArchiveFormProvider } from './hooks/use-create-archive-form'
import { PendingProvider } from './hooks/use-pending-status'

const Page = () => {
  return (
    <PendingProvider>
      <ArchiveFormProvider>
        <main className="flex items-start gap-6">
          <CreateArchiveForm className="min-h-[60vh] w-[486px]" />
          <FormStatus className="h-[60vh] w-[690px]" />
        </main>
      </ArchiveFormProvider>
    </PendingProvider>
  )
}

export default Page
