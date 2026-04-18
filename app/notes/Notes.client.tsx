"use client"
  import { useQuery, keepPreviousData } from "@tanstack/react-query"


import css from "./notes.module.css"

import{ useState } from "react"
import { fetchNotes } from "@/lib/api"
import SearchBox from "@/components/SearchBox/SearchBox"
import Pagination from "@/components/Pagination/Pagination"
import NoteList from "@/components/NoteList/NoteList"
import NoteForm from "@/components/NoteForm/NoteForm"
import Modal from "@/components/Modal/Modal"
import { useDebouncedCallback } from "use-debounce"
import Loading from "../loading"
export default function NotesClient(){

  const [searchNote, setSearchNote] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const openModal =()=> setIsModalOpen(true) 
  const closeModal =()=> setIsModalOpen(false)

 

  const {data, isLoading, isSuccess, error} = useQuery({
    queryKey:["notes", searchNote, currentPage],
    queryFn: ()=> fetchNotes(searchNote, currentPage),
    placeholderData: keepPreviousData
  })

  const handleSearchNote = (newSearchNote:string)=>{
    setSearchNote(newSearchNote)
    setCurrentPage(1)
  }
   const handleSearch = useDebouncedCallback(
   handleSearchNote, 300)
  
  const totalPage = data?.totalPages ?? 0

  return(
    <>
    <div className={css.app}>
	<header className={css.toolbar}>
		  <SearchBox 
        search={searchNote} 
        onChange={handleSearch}
      />
	{isSuccess && totalPage > 1 && (
    <Pagination 
    totalPages={totalPage}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
    />
   )}
    <button className={css.button} onClick={openModal}>Create note +</button>
  </header>
    {isLoading && <p>Loading, please wait...</p>}
    {error && <p>Something went wrong.</p>}
    {data && <NoteList notes={data.notes}/ >}
    {isModalOpen && (
      <Modal closeModal={closeModal}>
        <NoteForm closeClick={closeModal}/>
      </Modal>
    )}
    </div>
    </>
  )
}
