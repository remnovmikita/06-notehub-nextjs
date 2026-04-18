  import { noteById } from "@/lib/api"
import css from "./noteId.module.css"
  
  type Props ={
        params :Promise<{notesId:string}>
    }


export default async function Node(props:Props){
    const {notesId} = await props.params
    const note =await noteById(notesId)
    return(
     <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	  </div>
      <p className={css.tag}>{note.tag}</p>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>Created date</p>
	</div>
</div>

    )
}