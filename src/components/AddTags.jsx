import React from 'react';

const AddTags = ({ changeTags, removeTags, tags, scrollToFlashcard}) => {
    
    const handleKeyDown = (e) => {
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        changeTags(value)
        e.target.value = ''
    }

    return (     
        <div>
        <div className="tags-input-container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <label className="mb-10">Enter some tags.</label>
            <div className= "border">
                { tags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close" onClick={() => removeTags(index)}>&times;</span>
                    </div>
                )) }    
                <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder=" Add a tag" />
            </div>
            <button type="submit" className="next-button" onClick={scrollToFlashcard}>
                Next
            </button>    
        </div>
    </div>
    )
}

export default AddTags
