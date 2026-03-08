import { useState } from "react";
import "../css/ModalForm.css";

export default function ModalForm({ title, fields, onSubmit, onClose }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label || field.name}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(e, field.name)}
              />
            </div>
          ))}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}