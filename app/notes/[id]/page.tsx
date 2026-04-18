
import { fetchNoteById } from "@/lib/api"
import NoteClient from "./NoteDetails.client"

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function NotePage({ params }: Props) {
  const {id} = await params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient id={id} />
    </HydrationBoundary>
  )
}
