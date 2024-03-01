import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import {
    Button,
    PanelBody,
    ToggleControl,
    ColorPicker,
    Toolbar,
} from "@wordpress/components";
import { v4 as uuidv4 } from 'uuid'; 
import "./editor.scss";
import { RichText } from "@wordpress/block-editor"; 
export default function edit({ attributes, setAttributes }) {
    const { items, italic, bold, underline, textColor, lineColor } = attributes;
    const [isDragging, setIsDragging] = useState(null);

    const addItem = () => {
        const newItems = [...items, { id: uuidv4(), title: "", content: "" }];
        setAttributes({ items: newItems });
    };

    const updateItem = (id, key, value) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, [key]: value } : item
        );
        setAttributes({ items: updatedItems });
    };

    const removeItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setAttributes({ items: updatedItems });
    };

    const handleDragStart = (index) => {
        setIsDragging(index);
    };

    const handleDragEnd = () => {
        setIsDragging(null);
    };

    const handleDrop = (index) => {
        if (isDragging !== false) {
            const draggedItem = items[isDragging];
            const newItems = [...items];
            newItems.splice(isDragging, 1);
            newItems.splice(index, 0, draggedItem);
            setAttributes({ items: newItems });
            setIsDragging(null);
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Accordion Settings", "easy-accordion-gutenberg")}>
                    <ToggleControl
                        label={__("Italic", "easy-accordion-gutenberg")}
                        checked={italic}
                        onChange={(value) => setAttributes({ italic: value })}
                    />
                    <ToggleControl
                        label={__("Bold", "easy-accordion-gutenberg")}
                        checked={bold}
                        onChange={(value) => setAttributes({ bold: value })}
                    />
                    <ColorPicker
                        label={__("Text Color", "easy-accordion-gutenberg")}
                        color={textColor}
                        onChange={(value) => setAttributes({ textColor: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <Toolbar>
                    <Button
                        label={__("Move Up", "easy-accordion-gutenberg")}
                        className="components-icon-button"
                        icon="arrow-up-alt2"
                        onClick={handleDragEnd}
                    />
                    <Button
                        label={__("Move Down", "easy-accordion-gutenberg")}
                        className="components-icon-button"
                        icon="arrow-down-alt2"
                        onClick={handleDragEnd}
                    />
                </Toolbar>
            </BlockControls>
            <div {...useBlockProps()} className="accordion-container">
                {items.map((item, index) => (
                    <div
                        key={item.id} 
                        className={`accordion-item ${
                            isDragging === index ? "dragging" : ""
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnd={handleDragEnd}
                        onDrop={() => handleDrop(index)}
                    >
                        <input
                            type="text"
                            placeholder={__("Title", "easy-accordion-gutenberg")}
                            value={item.title}
                            onChange={(event) =>
                                updateItem(item.id, "title", event.target.value)
                            }
                            className="accordion-title"
                            style={{
                                fontStyle: italic ? "italic" : "normal",
                                fontWeight: bold ? "bold" : "normal",
                                textDecoration: underline ? "underline" : "none",
                                color: textColor,
                            }}
                        />

                        <div className="accordion-content">
                          
                            <RichText
                                tagName="div"
                                placeholder={__("Content", "easy-accordion-gutenberg")}
                                value={item.content}
                                onChange={(value) => updateItem(item.id, "content", value)}
                                className="accordion-content-text"
                            />
                        </div>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="accordion-remove-edit"
                        >
                            {__("Remove", "easy-accordion-gutenberg")}
                        </button>
                    </div>
                ))}
                <button onClick={addItem} className="accordion-add">
                    {__("Add Item", "easy-accordion-gutenberg")}
                </button>
            </div>
        </>
    );
}
