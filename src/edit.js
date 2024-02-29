import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
export default function edit({ attributes, setAttributes }) {
    const { items } = attributes;

    const addItem = () => {
        const newItems = [...items, { title: '', content: '' }];
        setAttributes({ items: newItems });
    };

    const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setAttributes({ items: newItems });
    };

    return (
        <div { ...useBlockProps() } className="accordion-container">
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <input
                        type="text"
                        placeholder={__('Title', 'easy-accordion-gutenberg')}
                        value={item.title}
                        onChange={(e) => updateItem(index, 'title', e.target.value)}
                        className="accordion-title"
                    />
                    <textarea
                        placeholder={__('Content', 'easy-accordion-gutenberg')}
                        value={item.content}
                        onChange={(e) => updateItem(index, 'content', e.target.value)}
                        className="accordion-content"
                    />
                    <button onClick={() => removeItem(index)} className="accordion-remove">{__('Remove', 'easy-accordion-gutenberg')}</button>
                </div>
            ))}
            <button onClick={addItem} className="accordion-add">{__('Add Item', 'easy-accordion-gutenberg')}</button>
        </div>
    );
}
