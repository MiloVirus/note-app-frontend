import React, { useState } from 'react';
import '../styles/filter.css'

const Filter = ({ tags, filterTags }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCheckboxChange = (tagName) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(tag => tag !== tagName));
      filterTags(tagName)
    } else {
      setSelectedTags([...selectedTags, tagName]);
      filterTags(tagName)
    }
  };

  return (
    <section className="filter-container">
      <h3>Filter by Tags</h3>
      <div className="tags">
        {tags.map((tag) => (
          <div key={tag}>
            <input
              type="checkbox"
              id={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filter;
