import { CreateArchiveForm } from './components/create-archive-form'
import { FormStatus } from './components/form-status'
import { ArchiveFormProvider } from './hooks/use-create-archive-form'

const Page = () => {
  return (
    <ArchiveFormProvider>
      <main className="flex items-start gap-6">
        <CreateArchiveForm className="h-[650px] w-[486px]" />
        <FormStatus className="h-[650px] w-[690px]" />
      </main>
    </ArchiveFormProvider>
  )
}

export default Page
