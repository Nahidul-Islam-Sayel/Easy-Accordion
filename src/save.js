import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { items, italic, bold, underline, textColor } = attributes;

    const getStyles = (italic, bold, underline, textColor) => {
        return {
            fontStyle: italic ? 'italic' : 'normal',
            fontWeight: bold ? 'bold' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
            color: textColor,
        };
    };

    return (
        <div {...useBlockProps.save()} className="my-accordion-container">
            {items.map((item, index) => (
                <div key={item.id} className="my-accordion-item">
                    <input type="checkbox" id={`my-accordion-item-${item.id}`} />
                    <label
                        htmlFor={`my-accordion-item-${item.id}`}
                        className="my-accordion-title"
                        style={getStyles(italic, bold, underline, textColor)}
                    >
                        {item.title}
                    </label>
                    <div
                        className="my-accordion-content"
                        dangerouslySetInnerHTML={{ __html: item.content }} 
                    />
                </div>
            ))}
        </div>
    );
}
