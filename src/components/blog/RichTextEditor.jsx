import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextEditor.css'; // Import custom styling

// Function to clean HTML and remove inline styles
const cleanHtmlOutput = (html) => {
  if (!html) return '';
  
  // Remove all inline style attributes
  let cleaned = html.replace(/style="[^"]*"/g, '');
  
  // Remove malformed span attributes (handle broken font declarations)
  cleaned = cleaned.replace(/<span[^>]*Apple Color Emoji[^>]*>/g, '<span>');
  cleaned = cleaned.replace(/<span[^>]*Segoe UI Emoji[^>]*>/g, '<span>');
  cleaned = cleaned.replace(/<span[^>]*Noto Color Emoji[^>]*>/g, '<span>');
  
  // Remove any span with malformed attributes
  cleaned = cleaned.replace(/<span\s+[^">]*"[^>]*>/g, '<span>');
  
  // Remove font-family, color, background-color attributes
  cleaned = cleaned.replace(/font-family:[^;"]*(;|")/g, '');
  cleaned = cleaned.replace(/color:[^;"]*(;|")/g, '');
  cleaned = cleaned.replace(/background-color:[^;"]*(;|")/g, '');
  cleaned = cleaned.replace(/font-size:[^;"]*(;|")/g, '');
  cleaned = cleaned.replace(/text-align:\s*left(;|")/g, ''); // Remove default left alignment
  
  // Clean up any remaining empty style attributes
  cleaned = cleaned.replace(/style\s*=\s*["']\s*["']/g, '');
  cleaned = cleaned.replace(/style\s*=\s*["'][\s;]*["']/g, '');
  
  // Remove empty attributes on HTML tags
  cleaned = cleaned.replace(/<(\w+)\s+>/g, '<$1>');
  
  // Remove empty spans
  cleaned = cleaned.replace(/<span>\s*<\/span>/g, '');
  
  // Unwrap unnecessary spans
  cleaned = cleaned.replace(/<span>([^<]+)<\/span>/g, '$1');
  
  // Ensure proper spacing and structure
  cleaned = cleaned.replace(/<\/h([1-6])>\s*<p>/g, '</h$1>\n\n<p>');
  cleaned = cleaned.replace(/<\/p>\s*<h([1-6])/g, '</p>\n\n<h$1');
  cleaned = cleaned.replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>');
  cleaned = cleaned.replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>');
  cleaned = cleaned.replace(/<\/p>\s*<ul>/g, '</p>\n\n<ul>');
  cleaned = cleaned.replace(/<\/p>\s*<ol>/g, '</p>\n\n<ol>');
  
  // Clean up multiple consecutive line breaks
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return cleaned.trim();
};

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
    const rawHtml = draftToHtml(convertToRaw(state.getCurrentContent()));
    const cleanHtml = cleanHtmlOutput(rawHtml);
    onChange(cleanHtml);
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
