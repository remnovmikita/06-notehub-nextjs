
import { fetchNoteById } from "@/lib/api"
import NoteClient from "./NoteDetails.client"

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

type Props = {
  params: { id: string }
}

export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient id={params.id} />
    </HydrationBoundary>
  )
}
