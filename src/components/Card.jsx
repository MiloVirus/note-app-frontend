import React, { useState } from 'react'
import '../styles/card.css'
import { IoPencil } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { IoArchive } from "react-icons/io5";


const Card = ({id, title, content, tags, handleEdit, handleDelete, active, handleArchive, allTags}) => {

  const [edit, setEdit] = useState(true)
  const [localTitle, setLocalTitle] = useState(title); 
  const [localContent, setLocalContent] = useState(content);
  const [localTags, setLocalTags] = useState(tags); 

  useEffect(() => {
    setLocalTitle(title);
    setLocalContent(content);
    setLocalTags(tags);
  }, [title, content, tags])
  
 
  const onEdit = () => 
    {
      setEdit(!edit)
    }

    const handleSave = () => {
      handleEdit(id, localTitle, localContent, localTags, active);
      setEdit(!edit)
    };

    const handleTagClick = (item) => { 

      if (!localTags.includes(item)) {
        setLocalTags([...localTags, item]); 
       
      } else {
        const updatedTags = localTags.filter(tag => tag !== item);
        setLocalTags(updatedTags); 
      }
    };


  return (
    <>
    {
      edit ? (<section>
        <div className="note-card">
        <div className='btnContainer'>
            <button onClick={onEdit} className="edit-btn" >
            <IoPencil />
          </button>
          <button onClick={() => handleArchive(id)} className="edit-btn" >
            <IoArchive />
          </button>
        </div>
        
            <h3 className="note-card-title" placeholder='Title'>{title}</h3>
            <p className="note-card-content">{content}</p>

            <section className='tagsContainer'>
            {
              tags.map((item, index) =>
              {
                return(
                  
                    <div className={`tagsCard`}>{item}</div>
                  
                )
              })
            }
            </section>
            <button onClick={() => handleDelete(id)} className="edit-btn">
              <FaTrash />
            </button>
        </div>
    </section>) 
    : (<section>
            <div className="note-card">
            <button onClick={onEdit} className="edit-btn" >
              <IoClose />
                </button>
                <input
                className="note-card-title-input-edit"
                required
                onChange={(e) => setLocalTitle(e.target.value)}
                type="text"
                placeholder="Title"
                value={localTitle}
              />
              <input
                className="note-card-content-input-edit"
                required
                onChange={(e) => setLocalContent(e.target.value)}
                type="text"
                placeholder="Content"
                value={localContent}
              />
          <button className="saveBtn" onClick={handleSave}>Save</button>
                <section className='tagsContainer'>
                {allTags.map((item, index) => (
                <div
                key={index}
                onClick={() => handleTagClick(item)} 
                className={`tags ${localTags.includes(item) ? 'active' : ''}`}
                >
                {item}
                </div>
            ))}
                </section>
            </div>
        </section>)
    }
        
    </>
  )
}

export default Card