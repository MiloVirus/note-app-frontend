import React, { useState } from 'react';
import '../styles/inputcard.css';

const InputCard = ({ tags, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [inputTags, setInputTags] = useState([])


   const toggleTag = (item) => {
   
    if(!inputTags.includes(item)) 
    {
      setInputTags([...inputTags, item])
    }else
    {
      const filteredTags = inputTags.filter(tag => tag !== item)
      setInputTags(filteredTags)
    }
  };  

  const handleSave = () => {
    onSave(title, content, inputTags);
    setTitle('');  
    setContent('');
  };
  return (
    <>
      <section>
        <div className="note-card">
        <form>
          <input
            className="note-card-title-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            value={title}
          />
          <input
            className="note-card-content-input"
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Content"
            value={content}
          />
          <button className="saveBtn" onClick={handleSave}>Save</button>
          <section className="tagsContainer">
          {
            tags.map((item, index) => (
                <div
                key={index}
                onClick={() => toggleTag(item)} 
                className={`tags ${inputTags.includes(item) ? 'active' : ''}`}  
                >
                {item}
                </div>
            ))
        }
        </section>
        </form>
        </div>
      </section>
    </>
  );
};

export default InputCard;
