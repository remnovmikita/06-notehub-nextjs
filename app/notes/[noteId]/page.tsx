import { fetchNoteById } from "@/lib/api"
import css from "./noteId.module.css"
// import { noteById } from "@/lib/api"

 type Props ={
        params :Promise<{noteId:string}>
    }


export default async function Note(props:Props){
    const {noteId} = await props.params
    const note = await fetchNoteById(noteId)
    return(
     <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
      <p className={css.tag}>{note.tag}</p>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{note.createdAt}</p>
	</div>
</div>
    )
}