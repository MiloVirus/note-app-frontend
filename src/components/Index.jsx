import React, { useEffect, useState} from 'react';
import Card from './Card';
import '../styles/index.css';
import InputCard from './InputCard';
import Filter from './Filter';
import Navbar from './NavBar';
import { fetchNotes, createNote, deleteNote, updateNote } from '../services/noteService';

const Index = () => {
  const [toggleScreen, setToggleScreen] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState(['sport', 'wild', 'game', 'technology']);
  const [activeTab, setActiveTab] = useState('active');

  const handleToggle = () => {
    setToggleScreen(!toggleScreen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNotes();
        setNoteList(response);
      } catch (error) {
        console.log('Error fetching notes', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredList(noteList);
  }, [noteList]);

  const handleSave = async (title, content, inputTags) => {
    const newNote = { title, content, tags: inputTags, active: true };
    try {
      const savedNote = await createNote(newNote);
      setNoteList([...noteList, savedNote]);
      setToggleScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, title, content, tags) => {
    const updatedNote = { title, content, tags };
    try {
      const updated = await updateNote(id, updatedNote);
      const updatedNotes = noteList.map((note) =>
        note.id === id ? updated : note
      );
      setNoteList(updatedNotes);
    } catch (error) {
      console.log('Error updating note:', error);
    }
  };

  const handleArchive = async (id) => {
    const archiveNote = noteList.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setNoteList(archiveNote);

    try {
      const noteToUpdate = noteList.find((note) => note.id === id);
      await updateNote(id, { ...noteToUpdate, active: !noteToUpdate.active });
    } catch (error) {
      console.error('Error updating note in the database:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      const filterNote = noteList.filter((item) => item.id !== id);
      setNoteList(filterNote);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const filterTags = (tagName) => {
    const updatedTags = selectedTags.includes(tagName)
      ? selectedTags.filter((tag) => tag !== tagName)
      : [...selectedTags, tagName];

    setSelectedTags(updatedTags);

    if (updatedTags.length === 0) {
      setFilteredList(noteList);
    } else {
      const filteredNotes = noteList.filter((note) =>
        updatedTags.some((tag) => note.tags.includes(tag))
      );
      setFilteredList(filteredNotes);
    }
  };

  const renderByActive = () => {
    return (
      <article className="noteContainer">
        {filteredList
          .filter((item) =>
            activeTab === 'active' ? item.active : !item.active
          )
          .map((item, index) => (
            <Card
              key={index}
              onSave={handleSave}
              setTags={setTags}
              id={item.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleArchive={handleArchive}
              title={item.title}
              content={item.content}
              active={item.active}
              tags={item.tags}
              allTags={tags}
            />
          ))}
        {toggleScreen && (
          <InputCard tags={tags} setTags={setTags} onSave={handleSave} />
        )}
        <button className="buttonCard" onClick={handleToggle}>+</button>
      </article>
    );
  };

  return (
    <>
      <Filter
        tags={tags}
        filterTags={filterTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <p>Welcome to your note App</p>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderByActive()}
    </>
  );
};

export default Index;

