import React from 'react';
import './style.scss'; 
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { items } = attributes;
	

    return (
        <div { ...useBlockProps.save() } className="my-accordion-container">
            {items.map((item, index) => (
                <div key={index} className="my-accordion-item">
                    <input type="checkbox" id={`my-accordion-item-${index}`} />
                    <label htmlFor={`my-accordion-item-${index}`} className="my-accordion-title">
                        {item.title}
                    </label>
                    <div className="my-accordion-content">
                        <p>{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
