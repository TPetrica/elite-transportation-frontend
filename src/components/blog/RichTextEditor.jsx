import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextEditor.css'; // Import custom styling

const RichTextEditor = ({ value, onChange, placeholder = 'Write your content here...' }) => {
  const [editorState, setEditorState] = useState(() => {
    if (!value) {
      return EditorState.createEmpty();
    }
    
    // First, try to parse as HTML
    try {
      const blocksFromHtml = htmlToDraft(value);
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
      }
    } catch (error) {
      console.warn('Failed to parse HTML content', error);
    }
    
    // If HTML parsing fails, treat it as plain text
    const contentState = ContentState.createFromText(value);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    if (!value) {
      setEditorState(EditorState.createEmpty());
    } else if (value !== draftToHtml(convertToRaw(editorState.getCurrentContent()))) {
      try {
        const blocksFromHtml = htmlToDraft(value);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.warn('Failed to parse HTML content in useEffect', error);
      }
    }
  }, [value]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange(htmlContent);
  };

  const toolbarOptions = {
    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
      bold: { className: 'custom-button-style' },
      italic: { className: 'custom-button-style' },
      underline: { className: 'custom-button-style' },
      strikethrough: { className: 'custom-button-style' },
    },
    blockType: {
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
      className: 'custom-dropdown-style',
    },
    list: {
      options: ['unordered', 'ordered'],
      unordered: { className: 'custom-button-style' },
      ordered: { className: 'custom-button-style' },
    },
    textAlign: {
      options: ['left', 'center', 'right', 'justify'],
      left: { className: 'custom-button-style' },
      center: { className: 'custom-button-style' },
      right: { className: 'custom-button-style' },
      justify: { className: 'custom-button-style' },
    },
    link: {
      options: ['link', 'unlink'],
      link: { className: 'custom-button-style' },
      unlink: { className: 'custom-button-style' },
    },
    history: {
      options: ['undo', 'redo'],
      undo: { className: 'custom-button-style' },
      redo: { className: 'custom-button-style' },
    },
  };

  return (
    <div className="rich-text-editor">
      <Editor
        editorState={editorState}
        wrapperClassName="rich-text-wrapper"
        editorClassName="rich-text-editor-content"
        toolbarClassName="rich-text-toolbar"
        onEditorStateChange={handleEditorChange}
        placeholder={placeholder}
        toolbar={toolbarOptions}
      />
    </div>
  );
};

export default RichTextEditor;
