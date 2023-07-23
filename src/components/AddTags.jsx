import React from 'react';

const AddTags = ({ changeTags, removeTags, tags}) => {
    
    const handleKeyDown = (e) => {
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        changeTags(value)
        e.target.value = ''
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTags(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder=" Add a tag" />
        </div>
    )
}

export default AddTags
